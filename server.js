const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Route for admin panel (must be before static middleware)
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('.', { etag: false, lastModified: false }));
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.set('Pragma', 'no-cache');
  next();
});

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'weboutshop',
  password: '123456',
  port: 5432,
});

// ========== PRODUCTS ==========

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    const products = result.rows.map(p => {
      let images = [];
      if (p.images) {
        images = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
      }
      if ((!images || images.length === 0) && p.image) {
        images = [p.image];
      }
      return { ...p, images };
    });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const p = result.rows[0];
    let images = [];
    if (p.images) {
      images = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
    }
    if ((!images || images.length === 0) && p.image) {
      images = [p.image];
    }
    res.json({ ...p, images });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// GET products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    let result;
    if (category === 'Todas') {
      result = await pool.query('SELECT * FROM products ORDER BY id');
    } else {
      result = await pool.query('SELECT * FROM products WHERE category = $1 ORDER BY id', [category]);
    }
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products by category:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// POST create category
app.post('/api/categories', async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es requerido' });
    const result = await pool.query(
      'INSERT INTO categories (name, image) VALUES ($1, $2) RETURNING *',
      [name, image || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// PUT update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es requerido' });
    
    // Begin transaction
    await pool.query('BEGIN');
    
    // Get old category name
    const oldCatResult = await pool.query('SELECT name FROM categories WHERE id = $1', [id]);
    if (oldCatResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    const oldName = oldCatResult.rows[0].name;

    // Update category
    const result = await pool.query(
      'UPDATE categories SET name = $1, image = $2 WHERE id = $3 RETURNING *',
      [name, image || null, id]
    );

    // Update products using this category
    await pool.query(
      'UPDATE products SET category = $1 WHERE category = $2',
      [name, oldName]
    );

    await pool.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// DELETE category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ensure we don't delete if products are using it
    const catResult = await pool.query('SELECT name FROM categories WHERE id = $1', [id]);
    if (catResult.rows.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    const catName = catResult.rows[0].name;

    const prodResult = await pool.query('SELECT COUNT(*) FROM products WHERE category = $1', [catName]);
    if (parseInt(prodResult.rows[0].count) > 0) {
      return res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene productos asignados.' });
    }

    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    res.json({ message: 'Categoría eliminada', category: result.rows[0] });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

// POST create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, original_price, discount, stock, category, sizes, colors, images, description } = req.body;
    const imagesJson = JSON.stringify(images || []);
    const firstImage = (images && images.length > 0) ? images[0] : null;
    const result = await pool.query(
      `INSERT INTO products (name, price, original_price, discount, stock, category, sizes, colors, image, images, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [name, price, original_price, discount, stock || 0, category, sizes || '', colors || '', firstImage, imagesJson, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, original_price, discount, stock, category, sizes, colors, images, description } = req.body;
    const imagesJson = JSON.stringify(images || []);
    const firstImage = (images && images.length > 0) ? images[0] : null;
    const result = await pool.query(
      `UPDATE products SET name=$1, price=$2, original_price=$3, discount=$4, stock=$5, category=$6, sizes=$7, colors=$8, image=$9, images=$10, description=$11
       WHERE id=$12 RETURNING *`,
      [name, price, original_price, discount, stock || 0, category, sizes || '', colors || '', firstImage, imagesJson, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado', product: result.rows[0] });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

// ========== ORDERS ==========

// POST create order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, email, phone, address, address_type, address_street, address_locality, address_instructions, address_neighborhood, address_city, address_zip, city, zip_code, payment_method, items, total } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (customer_name, email, phone, address, address_type, address_street, address_locality, address_instructions, address_neighborhood, address_city, address_zip, city, zip_code, payment_method, items, total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [customer_name, email, phone, address, address_type || 'Casa', address_street || '', address_locality || '', address_instructions || '', address_neighborhood || '', address_city || '', address_zip || '', city || '', zip_code || '', payment_method, JSON.stringify(items), total]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Error al crear pedido' });
  }
});

// GET all orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// PUT update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Error al actualizar pedido' });
  }
});

// ========== SLIDES ==========

// GET all slides
app.get('/api/slides', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM slides ORDER BY sort_order ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching slides:', err);
    res.status(500).json({ error: 'Error al obtener slides' });
  }
});

// GET active slides
app.get('/api/slides/active', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM slides WHERE active = true ORDER BY sort_order ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching active slides:', err);
    res.status(500).json({ error: 'Error al obtener slides activos' });
  }
});

// POST create slide
app.post('/api/slides', async (req, res) => {
  try {
    const { title, subtitle, link, image, button_text, sort_order, active } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es requerido' });
    const result = await pool.query(
      `INSERT INTO slides (title, subtitle, link, image, button_text, sort_order, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, subtitle || '', link || '#', image || null, button_text || 'Ver más', sort_order || 0, active !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating slide:', err);
    res.status(500).json({ error: 'Error al crear slide' });
  }
});

// PUT update slide
app.put('/api/slides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, image, button_text, sort_order, active } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es requerido' });
    const result = await pool.query(
      `UPDATE slides SET title=$1, subtitle=$2, link=$3, image=$4, button_text=$5, sort_order=$6, active=$7
       WHERE id=$8 RETURNING *`,
      [title, subtitle || '', link || '#', image || null, button_text || 'Ver más', sort_order || 0, active !== false, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slide no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating slide:', err);
    res.status(500).json({ error: 'Error al actualizar slide' });
  }
});

// DELETE slide
app.delete('/api/slides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM slides WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slide no encontrado' });
    }
    res.json({ message: 'Slide eliminado', slide: result.rows[0] });
  } catch (err) {
    console.error('Error deleting slide:', err);
    res.status(500).json({ error: 'Error al eliminar slide' });
  }
});

// ========== SPLIT BANNERS ==========

// GET all split banners
app.get('/api/split-banners', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM split_banners ORDER BY position ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching split banners:', err);
    res.status(500).json({ error: 'Error al obtener banners' });
  }
});

// GET active split banners
app.get('/api/split-banners/active', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM split_banners WHERE active = true ORDER BY position ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching active split banners:', err);
    res.status(500).json({ error: 'Error al obtener banners activos' });
  }
});

// POST create split banner
app.post('/api/split-banners', async (req, res) => {
  try {
    const { title, subtitle, link, image, button_text, position, active } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es requerido' });
    const result = await pool.query(
      `INSERT INTO split_banners (title, subtitle, link, image, button_text, position, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, subtitle || '', link || '#', image || null, button_text || 'Ver más', position || 1, active !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating split banner:', err);
    res.status(500).json({ error: 'Error al crear banner' });
  }
});

// PUT update split banner
app.put('/api/split-banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, image, button_text, position, active } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es requerido' });
    const result = await pool.query(
      `UPDATE split_banners SET title=$1, subtitle=$2, link=$3, image=$4, button_text=$5, position=$6, active=$7
       WHERE id=$8 RETURNING *`,
      [title, subtitle || '', link || '#', image || null, button_text || 'Ver más', position || 1, active !== false, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Banner no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating split banner:', err);
    res.status(500).json({ error: 'Error al actualizar banner' });
  }
});

// DELETE split banner
app.delete('/api/split-banners/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM split_banners WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Banner no encontrado' });
    }
    res.json({ message: 'Banner eliminado', banner: result.rows[0] });
  } catch (err) {
    console.error('Error deleting split banner:', err);
    res.status(500).json({ error: 'Error al eliminar banner' });
  }
});

// ========== USERS ==========

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, first_name, last_name, email, phone, created_at FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST create user (register)
app.post('/api/users', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Nombre, apellido, email y contraseña son requeridos' });
    }
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, phone, password)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, phone, created_at`,
      [first_name, last_name, email, phone || '', password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// POST login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// ========== START SERVER ==========
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
