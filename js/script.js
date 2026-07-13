// ========== API CONFIG ==========
const API_URL = window.location.origin + '/api';

async function apiGet(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API GET error:', err);
    return null;
  }
}

async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) return { error: json.error || `Error HTTP ${res.status}` };
    return json;
  } catch (err) {
    console.error('API POST error:', err);
    return { error: 'Error de conexión con el servidor' };
  }
}

async function apiPut(endpoint, data) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API PUT error:', err);
    return null;
  }
}

async function apiDelete(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API DELETE error:', err);
    return null;
  }
}

// ========== PRODUCT DATA (fallback local) ==========
const products = [
  {
    id: 1,
    name: "Blusa para dama color gris",
    price: 1799.99,
    originalPrice: 2499.99,
    discount: 28,
    rating: 4.8,
    reviews: 124,
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Tejido ligero y transpirable para máxima comodidad",
      "Diseño elegante ideal para el día a día",
      "Fácil combinación con cualquier prenda"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Negro", "Blanco"],
    description: "Blusa elegante para dama en color gris. Confeccionada en tela ligera y transpirable, perfecta para el día a día o eventos casuales.",
    specs: {
      "Composición": "100% Poliéster",
      "Talla": "S, M, L, XL",
      "Peso": "0.2 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar a mano"
    }
  },
  {
    id: 2,
    name: "Vestido floral de verano",
    price: 2199.99,
    originalPrice: 3199.99,
    discount: 31,
    rating: 4.9,
    reviews: 89,
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Estampa floral colorida y vibrante",
      "Tela fresca ideal para verano",
      "Corte favorecedor para toda figura"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Floral Rosa", "Floral Azul"],
    description: "Vestido floral ideal para los días de verano. Estampa colorida y tela fresca que te acompañará en cualquier ocasión.",
    specs: {
      "Composición": "95% Algodón, 5% Elastano",
      "Talla": "S, M, L",
      "Peso": "0.3 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar a máquina"
    }
  },
  {
    id: 3,
    name: "Jeans slim fit azul oscuro",
    price: 1599.99,
    originalPrice: null,
    discount: 0,
    rating: 4.6,
    reviews: 203,
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Corte slim fit moderno y ajustado",
      "Denim de alta calidad y durabilidad",
      "Perfecto para combinar con cualquier look"
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Azul Oscuro", "Azul Medio"],
    description: "Jeans slim fit en color azul oscuro. Corte moderno y ajustado que se adapta a tu cuerpo.",
    specs: {
      "Composición": "98% Algodón, 2% Elastano",
      "Talla": "28, 30, 32, 34, 36",
      "Peso": "0.7 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar del revés"
    }
  },
  {
    id: 4,
    name: "Chaqueta cuero sintético negra",
    price: 3499.99,
    originalPrice: 4999.99,
    discount: 30,
    rating: 4.7,
    reviews: 67,
    category: "Chaquetas",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Diseño clásico atemporal",
      "Forro interior cómodo y abrigado",
      "Cierre metálico de alta calidad"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro"],
    description: "Chaqueta de cuero sintético en color negro. Diseño clásico y atemporal que nunca pasa de moda.",
    specs: {
      "Composición": "100% Poliuretano",
      "Talla": "S, M, L, XL",
      "Peso": "0.9 kg",
      "Origen": "Importado",
      "Cuidado": "Limpiar en seco"
    }
  },
  {
    id: 5,
    name: "Falda midi plisada rosa",
    price: 1299.99,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 156,
    category: "Faldas",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Plisado elegante y femenino",
      "Corte midi favorecedor",
      "Tela fluida con movimiento"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Rosa", "Beige"],
    description: "Falda midi plisada en color rosa. Corte elegante y femenino, perfecta para combinar con blusas o tops.",
    specs: {
      "Composición": "100% Poliéster",
      "Talla": "S, M, L",
      "Peso": "0.3 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar a mano"
    }
  },
  {
    id: 6,
    name: "Camiseta algodón blanca",
    price: 799.99,
    originalPrice: 1199.99,
    discount: 33,
    rating: 4.4,
    reviews: 312,
    category: "Camisetas",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Algodón 100% natural y suave",
      "Prenda esencial versátil",
      "Cómoda para todo el día"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanco", "Negro", "Gris"],
    description: "Camiseta básica de algodón en color blanco. Tejido suave y cómodo, prenda esencial en cualquier guardarropa.",
    specs: {
      "Composición": "100% Algodón",
      "Talla": "S, M, L, XL, XXL",
      "Peso": "0.2 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar a máquina"
    }
  },
  {
    id: 7,
    name: "Top asimétrico negro",
    price: 1099.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviews: 78,
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Diseño asimétrico moderno y único",
      "Tela elástica y cómoda",
      "Perfecto para noches de salida"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Rojo"],
    description: "Top asimétrico en color negro. Diseño moderno y llamativo, ideal para noches de salida.",
    specs: {
      "Composición": "95% Poliéster, 5% Elastano",
      "Talla": "S, M, L",
      "Peso": "0.15 kg",
      "Origen": "Importado",
      "Cuidado": "Lavar a mano"
    }
  },
  {
    id: 8,
    name: "Pantalón palazzo beige",
    price: 1899.99,
    originalPrice: 2699.99,
    discount: 30,
    rating: 4.6,
    reviews: 94,
    category: "Jeans",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Corte amplio y fluido",
      "Comodidad y elegancia en una prenda",
      "Tela ligera perfecta para verano"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Negro"],
    description: "Pantalón palazzo en color beige. Corte amplio y fluido que brinda comodidad y elegancia.",
    specs: {
      "Composición": "100% Viscosa",
      "Talla": "S, M, L, XL",
      "Peso": "0.4 kg",
      "Origen": "Argentina",
      "Cuidado": "Lavar a mano"
    }
  },
  {
    id: 9,
    name: "Blazer oversize gris marengo",
    price: 2999.99,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    reviews: 45,
    category: "Chaquetas",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Corte oversize moderno y relajado",
      "Versátil para looks informales o formales",
      "Tela de alta calidad y caída perfecta"
    ],
    sizes: ["S", "M", "L"],
    colors: ["Gris Marengo", "Negro"],
    description: "Blazer oversize en gris marengo. Corte amplio y moderno, perfecto para looks informales o de oficina.",
    specs: {
      "Composición": "65% Poliéster, 35% Viscosa",
      "Talla": "S, M, L",
      "Peso": "0.6 kg",
      "Origen": "Argentina",
      "Cuidado": "Limpiar en seco"
    }
  },
  {
    id: 10,
    name: "Bolso crossbody marrón",
    price: 1699.99,
    originalPrice: 2299.99,
    discount: 26,
    rating: 4.5,
    reviews: 167,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Diseño compacto y funcional",
      "Correa ajustable y cómoda",
      "Múltiples compartimentos internos"
    ],
    sizes: ["Única"],
    colors: ["Marrón", "Negro"],
    description: "Bolso crossbody en color marrón. Diseño compacto y funcional, ideal para el día a día.",
    specs: {
      "Composición": "Cuero sintético",
      "Talla": "Única",
      "Peso": "0.4 kg",
      "Origen": "Importado",
      "Cuidado": "Limpiar con paño húmedo"
    }
  },
  {
    id: 11,
    name: "Zapatillas deportivas blancas",
    price: 2499.99,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviews: 231,
    category: "Zapatos",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Diseño moderno y versátil",
      "Suela acolchada para mayor comodidad",
      "Material resistente y duradero"
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["Blanco"],
    description: "Zapatillas deportivas en color blanco. Diseño moderno y cómodo, perfectas para el día a día.",
    specs: {
      "Composición": "Malla sintética y cuero",
      "Talla": "36-42",
      "Peso": "0.8 kg",
      "Origen": "Importado",
      "Cuidado": "Limpiar con paño húmedo"
    }
  },
  {
    id: 12,
    name: "Gafas de sol redondas doradas",
    price: 899.99,
    originalPrice: 1399.99,
    discount: 36,
    rating: 4.3,
    reviews: 88,
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=150&h=150&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=150&h=150&fit=crop&q=60"
    ],
    features: [
      "Montura dorada elegante y resistente",
      "Lentes UV400 protección solar",
      "Estilo retro y atemporal"
    ],
    sizes: ["Única"],
    colors: ["Dorado", "Plateado"],
    description: "Gafas de sol redondas con montura dorada. Estilo retro y elegante que protege tus ojos del sol.",
    specs: {
      "Composición": "Metal y cristal",
      "Talla": "Única",
      "Peso": "0.05 kg",
      "Origen": "Importado",
      "Cuidado": "Limpiar con paño especial"
    }
  }
];

// ========== STATE ==========
let cart = [];
let wishlist = [];
let compareList = [];
let activeCategory = 'Todas';
let currentView = 'home'; // home, detail, checkout, loading, error

const categories = ['Todas', ...new Set(products.map(p => p.category))];

// ========== RENDER PRODUCTS ==========
function renderProducts(filter = 'Todas') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'Todas' ? products : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-box-open"></i>
        <h3>No se encontraron productos</h3>
        <p>No hay productos en esta categoría</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const starsHtml = renderStars(p.rating);
    const originalPriceHtml = p.originalPrice
      ? `<span class="price-original">$${p.originalPrice.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>`
      : '';
  const discountHtml = p.discount > 0
      ? `<div class="discount-badge">-${p.discount}%</div>`
      : '';
    const mainImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : p.image;

    return `
      <div class="product-card">
        <div class="product-img-wrapper" onclick="navigateToProductId(${p.id})">
          <img src="${mainImage}" alt="${p.name}" loading="lazy">
          ${discountHtml}
        </div>
        <button class="wishlist-icon ${isInWishlist(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); addToWishlist(${p.id})">
          <i class="${isInWishlist(p.id) ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <div class="product-info">
          <div class="product-info-content">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span class="stars">${starsHtml}</span>
              <span class="rating-count">(${p.reviews})</span>
            </div>
            <div class="product-price">
              <span class="price-current">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              ${originalPriceHtml}
            </div>
          </div>
          <button class="product-buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>`;
  }).join('');
}

// ========== RENDER STARS ==========
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '★';
  for (let i = 0; i < empty; i++) html += '☆';
  return html;
}

// ========== RENDER FILTERS ==========
function renderFilters() {
  const container = document.getElementById('filterAccordion');
  if (!container) return;

  container.innerHTML = categories.map(cat => `
    <button class="filter-accordion-item ${cat === activeCategory ? 'active' : ''}" onclick="filterByCategory('${cat}')">
      <span>${cat}</span>
      ${cat === activeCategory ? '<i class="fas fa-check"></i>' : ''}
    </button>
  `).join('');
}

function filterByCategory(category) {
  activeCategory = category;
  renderFilters();
  renderProducts(category);
  document.getElementById('filterDropdownText').textContent = category;
  toggleFilterDropdown();
}

// ========== FILTER DROPDOWN ==========
function toggleFilterDropdown() {
  const dropdown = document.getElementById('filterDropdown');
  if (!dropdown) return;
  dropdown.classList.toggle('open');
}

function closeFilterDropdown(e) {
  const dropdown = document.getElementById('filterDropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
}

// ========== CART ==========
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  renderCartPanel();

  const btn = event.target;
  btn.textContent = '¡Agregado!';
  btn.style.background = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Agregar al carrito';
    btn.style.background = '';
  }, 1200);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
  renderCartPanel();
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  updateCartUI();
  renderCartPanel();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const countEl = document.querySelector('.cart-count');
  if (countEl) countEl.textContent = getCartCount();
  updateBottomCartCount();
}

function renderCartPanel() {
  const panel = document.getElementById('cartPanel');
  const items = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  if (!panel || !items || !total) return;

  if (cart.length === 0) {
    items.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <p>Tu carrito está vacío</p>
      </div>
    `;
    total.textContent = '$0.00';
    return;
  }

  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">$${item.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
        <div class="cart-item-qty">
          <button onclick="updateCartQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateCartQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  total.textContent = `$${getCartTotal().toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  if (!panel || !overlay) return;

  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    renderCartPanel();
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ========== WISHLIST ==========
function toggleWishlistPanel() {
  const panel = document.getElementById('wishlistPanel');
  if (!panel) return;

  const isOpen = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    renderWishlistPanel();
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = wishlist.find(item => item.id === id);
  if (existing) {
    removeFromWishlist(id);
    return;
  }

  wishlist.push({ ...product });
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderWishlistPanel();
  renderProducts(activeCategory);
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderWishlistPanel();
  renderProducts(activeCategory);
}

function isInWishlist(id) {
  return wishlist.some(item => item.id === id);
}

function toggleDetailWishlist(id) {
  addToWishlist(id);
  const link = document.getElementById('detailWishlistLink');
  if (link) {
    if (isInWishlist(id)) {
      link.innerHTML = '<i class="fas fa-heart" style="color:#e74c3c"></i> En favoritos';
    } else {
      link.innerHTML = '<i class="far fa-heart"></i> Agregar a favoritos';
    }
  }
}

function updateWishlistUI() {
  const countEl = document.querySelector('.wishlist-count');
  if (countEl) countEl.textContent = wishlist.length;
}

function addToCompare(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = compareList.find(item => item.id === id);
  if (existing) {
    compareList = compareList.filter(item => item.id !== id);
  } else {
    if (compareList.length >= 4) {
      alert('Solo puedes comparar hasta 4 productos');
      return;
    }
    compareList.push({ ...product });
  }
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareUI();
}

function isInCompare(id) {
  return compareList.some(item => item.id === id);
}

function toggleDetailCompare(id) {
  if (!isInCompare(id)) {
    addToCompare(id);
  }
  const link = document.getElementById('detailCompareLink');
  if (link) {
    if (isInCompare(id)) {
      link.innerHTML = '<i class="fas fa-exchange-alt" style="color:#cb354e"></i> En comparación';
    } else {
      link.innerHTML = '<i class="fas fa-exchange-alt"></i> Agregar para comparar';
    }
  }
  openCompareModal();
}

function updateCompareUI() {
  const countEl = document.querySelector('.compare-count');
  if (countEl) countEl.textContent = compareList.length;

  const viewBtn = document.getElementById('compareViewBtn');
  if (viewBtn) {
    if (compareList.length < 2) {
      viewBtn.disabled = true;
      viewBtn.style.opacity = '0.5';
      viewBtn.style.cursor = 'not-allowed';
    } else {
      viewBtn.disabled = false;
      viewBtn.style.opacity = '1';
      viewBtn.style.cursor = 'pointer';
    }
  }
}

function toggleComparePanel() {
  const panel = document.getElementById('comparePanel');
  if (panel) panel.classList.toggle('open');
  renderComparePanel();
}

function renderComparePanel() {
  const container = document.getElementById('compareItems');
  if (!container) return;

  if (compareList.length === 0) {
    container.innerHTML = '<p class="empty-text" style="padding:20px;text-align:center;color:#999">No hay productos para comparar.</p>';
    return;
  }

  container.innerHTML = compareList.map(p =>
    '<div class="compare-item">' +
      '<button class="compare-remove" onclick="addToCompare(' + p.id + '); renderComparePanel()"><i class="fas fa-times"></i></button>' +
      '<img src="' + p.image + '" alt="' + p.name + '" class="compare-item-img">' +
      '<p class="compare-item-name">' + p.name + '</p>' +
      '<p class="compare-item-price">$' + parseFloat(p.price).toLocaleString('es-AR', {minimumFractionDigits:2}) + '</p>' +
    '</div>'
  ).join('');
}

function openCompareModal() {
  const modal = document.getElementById('compareModal');
  const body = document.getElementById('compareModalBody');
  if (!modal || !body) return;

  if (compareList.length < 1) {
    modal.style.display = 'none';
    return;
  }

  const data = compareList.map(p => {
    const price = p.price ? '$' + parseFloat(p.price).toLocaleString('es-AR', {minimumFractionDigits:2}) : '-';
    const orig = p.originalPrice ? '$' + parseFloat(p.originalPrice).toLocaleString('es-AR', {minimumFractionDigits:2}) : '';
    const disc = p.discount ? '-' + p.discount + '%' : '';
    const rating = p.rating ? '★ ' + p.rating : '-';
    const reviews = p.reviews ? ' (' + p.reviews + ' reseñas)' : '';
    const desc = p.description ? p.description : 'Sin descripción';
    return {
      id: p.id,
      image: '<img src="' + (p.image || '') + '" alt="' + (p.name || '') + '">',
      name: p.name || '',
      price: price + (orig ? '<span class="cmp-orig">' + orig + '</span>' : '') + (disc ? '<span class="cmp-disc">' + disc + '</span>' : ''),
      rating: rating + reviews,
      category: p.category || '-',
      description: desc.length > 160 ? desc.substring(0, 160) + '...' : desc,
      actions: '<button class="cmp-cart" onclick="addToCart(' + p.id + ')">Agregar al carrito</button>' +
               '<button class="cmp-del" onclick="addToCompare(' + p.id + '); openCompareModal();">Eliminar</button>'
    };
  });

  const cell = key => data.map(d => '<td class="cmp-cell">' + d[key] + '</td>').join('');

  const html =
    '<table class="compare-table"><tbody>' +
      '<tr><th class="row-label">Imagen</th>' + cell('image') + '</tr>' +
      '<tr><th class="row-label">Nombre</th>' + cell('name') + '</tr>' +
      '<tr><th class="row-label">Precio</th>' + cell('price') + '</tr>' +
      '<tr><th class="row-label">Rating</th>' + cell('rating') + '</tr>' +
      '<tr><th class="row-label">Categoría</th>' + cell('category') + '</tr>' +
      '<tr><th class="row-label">Descripción</th>' + cell('description') + '</tr>' +
      '<tr><th class="row-label">Acciones</th>' + cell('actions') + '</tr>' +
    '</tbody></table>';

  body.innerHTML = html;
  modal.style.display = 'flex';
}

function closeCompareModal() {
  const modal = document.getElementById('compareModal');
  if (modal) modal.style.display = 'none';
}

function renderWishlistPanel() {
  const items = document.getElementById('wishlistItems');
  if (!items) return;

  if (wishlist.length === 0) {
    items.innerHTML = `
      <div class="wishlist-empty">
        <i class="fas fa-heart"></i>
        <p>Tu lista de favoritos está vacía</p>
      </div>
    `;
    return;
  }

  items.innerHTML = wishlist.map(p => `
    <div class="wishlist-item">
      <img src="${p.image}" alt="${p.name}" class="wishlist-item-img" onclick="navigateToProductId(${p.id}); toggleWishlistPanel();">
      <div class="wishlist-item-info">
        <div class="wishlist-item-name">${p.name}</div>
        <div class="wishlist-item-price">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</div>
      </div>
      <button class="wishlist-item-remove" onclick="removeFromWishlist(${p.id})">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

// ========== PRODUCT DETAIL ==========
let currentDetailImages = [];
let currentDetailMainIndex = 0;
let currentDetailProduct = null;

function showDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  currentDetailProduct = product;
  currentDetailImages = product.images;
  currentDetailMainIndex = 0;
  detailQty = 1;

  const container = document.getElementById('productDetail');
  if (!container) return;

  const starsHtml = renderStars(product.rating);
  const originalPriceHtml = product.originalPrice
    ? `<span class="detail-price-original">$${product.originalPrice.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>`
    : '';
  const discountHtml = product.discount > 0
    ? `<span class="detail-discount">Save ${product.discount}%</span>`
    : '';

  const featuresHtml = product.features
    ? product.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')
    : '';

  const sizesHtml = product.sizes
    ? product.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize(this)">${s}</button>`).join('')
    : '';

  const colorsHtml = product.colors
    ? product.colors.map((c, i) => `<button class="color-btn ${i === 0 ? 'active' : ''}" onclick="selectColor(this)">${c}</button>`).join('')
    : '';

  const specsHtml = product.specs
    ? Object.entries(product.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')
    : '';

  const related = products.filter(p => p.id !== product.id).slice(0, 4);
  const relatedHtml = related.map(p => {
    const starsHtml = renderStars(p.rating);
    const origPriceHtml = p.originalPrice
      ? `<span class="price-original">$${p.originalPrice.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>`
      : '';
    const discHtml = p.discount > 0
      ? `<div class="discount-badge">-${p.discount}%</div>`
      : '';
    const mainImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : p.image;

    return `
      <div class="product-card">
        <div class="product-img-wrapper" onclick="navigateToProductId(${p.id})">
          <img src="${mainImage}" alt="${p.name}" loading="lazy">
          ${discHtml}
          <button class="wishlist-icon ${isInWishlist(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); addToWishlist(${p.id})">
            <i class="${isInWishlist(p.id) ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <div class="product-info-content">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span class="stars">${starsHtml}</span>
              <span class="rating-count">(${p.reviews})</span>
            </div>
            <div class="product-price">
              <span class="price-current">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              ${origPriceHtml}
            </div>
          </div>
          <button class="product-buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="detail-breadcrumb">
      <a href="#" onclick="goHome()">Home</a> / 
      <a href="#">${product.category}</a> / 
      <span>${product.name}</span>
    </div>

    <div class="detail-main">
      <div class="detail-gallery">
        <div class="detail-thumbnails">
          ${product.images.map((img, i) => `
            <div class="detail-thumb ${i === 0 ? 'active' : ''}" onclick="changeDetailImg(${i})">
              <img src="${img}" alt="Vista ${i + 1}">
            </div>
          `).join('')}
        </div>
        <div class="detail-main-img-wrapper">
          <button class="gallery-arrow gallery-prev" onclick="prevDetailImg()"><i class="fas fa-chevron-left"></i></button>
          <button class="mobile-img-arrow mobile-img-prev" onclick="prevDetailImg()"><i class="fas fa-chevron-left"></i></button>
          <img src="${product.images[0]}" alt="${product.name}" id="detailMainImg">
          <button class="gallery-arrow gallery-next" onclick="nextDetailImg()"><i class="fas fa-chevron-right"></i></button>
          <button class="mobile-img-arrow mobile-img-next" onclick="nextDetailImg()"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>

      <div class="detail-info">
        <span class="detail-category">${product.category}</span>
        <h1 class="detail-name">${product.name}</h1>
        <div class="detail-price-row">
          <span class="detail-price-current">$${product.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
          ${originalPriceHtml}
          ${discountHtml}
        </div>
        <div class="detail-rating">
          <span class="stars">${starsHtml}</span>
          <span class="rating-count">(${product.reviews} reviews)</span>
        </div>

        <ul class="detail-features">${featuresHtml}</ul>

        <div class="detail-options">
          <div class="detail-option-group">
            <label>Size:</label>
            <div class="size-options">${sizesHtml}</div>
          </div>
          <div class="detail-option-group">
            <label>Color:</label>
            <div class="color-options">${colorsHtml}</div>
          </div>
        </div>

        <div class="detail-qty-row">
          <label>Cantidad:</label>
          <div class="qty-selector">
            <button onclick="changeDetailQty(-1)">-</button>
            <span id="detailQty">1</span>
            <button onclick="changeDetailQty(1)">+</button>
          </div>
          <span class="detail-total-price" id="detailTotalPrice">$${product.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
        </div>

        <div class="detail-actions">
          <button class="detail-add-cart" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
        <button class="detail-buy-now" onclick="addToCart(${product.id}); openCheckout()">Comprar ahora</button>

        <div class="detail-links">
          <a href="#" id="detailWishlistLink" onclick="event.preventDefault(); toggleDetailWishlist(${product.id})"><i class="far fa-heart"></i> Agregar a favoritos</a>
          <a href="#" id="detailCompareLink" onclick="event.preventDefault(); toggleDetailCompare(${product.id})"><i class="fas fa-exchange-alt"></i> Agregar para comparar</a>
        </div>

        <div class="detail-share">
          <span>Share:</span>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-pinterest"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-whatsapp"></i></a>
        </div>

        <div class="detail-info-items">
          <div class="info-item"><i class="fas fa-truck"></i> Free Shipping & Returns - Available on all orders over $99</div>
          <div class="info-item"><i class="fas fa-clock"></i> Estimated Delivery - Orders are typically dispatched within 24 hours</div>
          <div class="info-item"><i class="fas fa-shield-alt"></i> Security Policy - Ensuring top-level security for your data and transactions</div>
        </div>
      </div>
    </div>

    <div class="detail-tabs">
      <div class="tabs-header">
        <button class="tab-btn active" onclick="switchTab('desc', this)">Description</button>
        <button class="tab-btn" onclick="switchTab('specs', this)">Product Details</button>
      </div>
      <div class="tab-content active" id="tab-desc">
        <h3>Iconic</h3>
        <p>${product.description}</p>
      </div>
      <div class="tab-content" id="tab-specs">
        <table class="specs-table">
          <tbody>${specsHtml}</tbody>
        </table>
      </div>
    </div>

    <div class="detail-related">
      <h2>También te puede gustar</h2>
      <div class="related-grid">${relatedHtml}</div>
    </div>
  `;

  showView('detail');
}

// ========== URL PRODUCT ROUTING ==========
function slugify(text) {
  return String(text || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}


function getProductUrl(product) {
  const cat = slugify(product.category) || 'productos';
  const name = slugify(product.name) || 'producto';
  return '/' + cat + '/' + name + '-' + product.id;
}

function navigateToProductId(id) {
  const p = products.find(x => x.id === id);
  if (!p) { openProductById(id); return; }
  history.pushState({ productId: id }, '', getProductUrl(p));
  showDetail(id);
}

function openProductById(id) {
  apiGet('/products/' + id).then(p => {
    if (!p) { window.location.href = '/'; return; }
    const images = (p.images && Array.isArray(p.images) && p.images.length)
      ? p.images
      : (p.image ? [p.image] : []);
    if (!products.find(x => x.id === p.id)) {
      products.push({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        originalPrice: p.original_price ? parseFloat(p.original_price) : null,
        discount: p.discount,
        rating: parseFloat(p.rating) || 4.5,
        reviews: p.reviews || 0,
        category: p.category,
        image: images[0] || '',
        images: images,
        features: ["Tejido de alta calidad", "Diseño moderno y cómodo", "Perfecto para el día a día"],
        sizes: (p.sizes && typeof p.sizes === 'string' && p.sizes.trim()) ? p.sizes.split(',').map(s => s.trim()) : ["S", "M", "L", "XL"],
        colors: (p.colors && typeof p.colors === 'string' && p.colors.trim()) ? p.colors.split(',').map(c => c.trim()) : ["Negro", "Blanco"],
        description: p.description,
        specs: { "Composición": "Textil", "Talla": p.sizes || '', "Peso": "0.3 kg", "Origen": "Argentina" }
      });
    }
    history.pushState({ productId: p.id }, '', getProductUrl(p));
    showDetail(p.id);
  });
}

function handleRoute() {
  const path = window.location.pathname;
  if (path === '/' || path === '' || path === '/index.html' || path === '/index.html/') {
    showView('home');
    return true;
  }
  const m = path.match(/\/([^\/]+)\/([^\/]+)-(\d+)\/?$/);
  if (m) {
    const id = parseInt(m[3], 10);
    if (products.length) {
      const p = products.find(x => x.id === id);
      if (p) { showDetail(id); return true; }
    }
    setTimeout(handleRoute, 200);
  }
  return false;
}

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/admin') return;
  handleRoute();
});

function goHome() {
  if (window.location.pathname !== '/') {
    history.pushState({}, '', '/');
  }
  showView('home');
}

let detailQty = 1;

function changeDetailQty(delta) {
  detailQty = Math.max(1, detailQty + delta);
  const el = document.getElementById('detailQty');
  if (el) el.textContent = detailQty;
  updateDetailTotalPrice();
}

function updateDetailTotalPrice() {
  const el = document.getElementById('detailTotalPrice');
  if (!el || !currentDetailProduct) return;
  const total = currentDetailProduct.price * detailQty;
  el.textContent = `$${total.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
}

function selectSize(btn) {
  btn.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(btn) {
  btn.parentElement.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

function prevDetailImg() {
  if (currentDetailMainIndex > 0) {
    changeDetailImg(currentDetailMainIndex - 1);
  }
}

function nextDetailImg() {
  if (currentDetailMainIndex < currentDetailImages.length - 1) {
    changeDetailImg(currentDetailMainIndex + 1);
  }
}

function changeDetailImg(index) {
  currentDetailMainIndex = index;
  const mainImg = document.getElementById('detailMainImg');
  const thumbs = document.querySelectorAll('.detail-thumb');

  if (mainImg) mainImg.src = currentDetailImages[index];
  thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
}

// ========== VIEW MANAGEMENT ==========
function showView(view) {
  currentView = view;
  localStorage.setItem('currentView', view);
  const views = ['homeView', 'detailView', 'checkoutView', 'loadingView', 'errorView', 'loginView', 'userPanelView', 'adminView', 'adminLoginView'];
  views.forEach(v => {
    const el = document.getElementById(v);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById(view + 'View');
  if (target) target.style.display = '';

  const isAdmin = view === 'admin' || view === 'adminLogin';
  document.body.classList.toggle('admin-mode', isAdmin);
  const displayStyle = isAdmin ? 'none' : '';
  
  const header = document.querySelector('.header');
  const navbar = document.querySelector('.navbar');
  const footer = document.querySelector('.footer');
  const bottomNav = document.getElementById('bottomNav');
  
  if (header) header.style.display = displayStyle;
  if (navbar) navbar.style.display = displayStyle;
  if (footer) footer.style.display = displayStyle;
  if (bottomNav) bottomNav.style.display = displayStyle;

  if (view === 'login') {
    showLoginView();
  } else if (view === 'userPanel') {
    updateUserPanel();
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function showLoading() {
  showView('loading');
  setTimeout(() => {
    showView('home');
  }, 2000);
}

function showError() {
  showView('error');
}

function retryLoad() {
  showLoading();
}

// ========== CHECKOUT ==========
function showCheckout() {
  if (cart.length === 0) {
    return;
  }
  populateCheckoutUserData();
  renderCheckoutSummary();
  loadFirstCheckoutAddress();
  showView('checkout');
}

function loadFirstCheckoutAddress() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');

  if (addresses.length > 0) {
    selectCheckoutAddress(addresses[0].id);
  }
}

function populateCheckoutUserData() {
  const nameEl = document.getElementById('checkoutUserName');
  const emailEl = document.getElementById('checkoutUserEmail');
  const phoneEl = document.getElementById('checkoutUserPhone');
  if (currentUser) {
    if (nameEl) nameEl.textContent = currentUser.name || '-';
    if (emailEl) emailEl.textContent = currentUser.email || '-';
    if (phoneEl) phoneEl.textContent = currentUser.phone || 'No especificado';
  } else {
    if (nameEl) nameEl.textContent = '-';
    if (emailEl) emailEl.textContent = '-';
    if (phoneEl) phoneEl.textContent = 'No especificado';
  }
}

function toggleCheckoutEdit() {
  const data = document.getElementById('checkoutUserData');
  const form = document.getElementById('checkoutEditForm');
  if (form.style.display === 'none') {
    if (currentUser) {
      document.getElementById('checkoutEditName').value = currentUser.name || '';
      document.getElementById('checkoutEditEmail').value = currentUser.email || '';
      document.getElementById('checkoutEditPhone').value = currentUser.phone || '';
    }
    data.style.display = 'none';
    form.style.display = 'block';
  } else {
    data.style.display = 'block';
    form.style.display = 'none';
  }
}

function saveCheckoutUserData() {
  const name = document.getElementById('checkoutEditName').value;
  const email = document.getElementById('checkoutEditEmail').value;
  const phone = document.getElementById('checkoutEditPhone').value;
  if (!name || !email) {
    alert('Nombre y email son requeridos');
    return;
  }
  currentUser = { ...currentUser, name, email, phone };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  populateCheckoutUserData();
  document.getElementById('checkoutUserData').style.display = 'block';
  document.getElementById('checkoutEditForm').style.display = 'none';
}

function showCheckoutAddressForm() {
  document.getElementById('checkoutAddressEmpty').style.display = 'none';
  document.getElementById('checkoutAddressSaved').style.display = 'none';
  document.getElementById('addressModal').style.display = 'flex';
}

function showCheckoutAddressList() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');
  const container = document.getElementById('checkoutSavedAddressesList');
  const listDiv = document.getElementById('checkoutAddressSavedList');

  document.getElementById('checkoutAddressEmpty').style.display = 'none';
  document.getElementById('checkoutAddressSaved').style.display = 'none';

  if (addresses.length === 0) {
    document.getElementById('checkoutAddressEmpty').style.display = 'block';
    return;
  }

  container.innerHTML = addresses.map(addr => {
    const icon = addr.type === 'Casa' ? 'fa-home' : addr.type === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
    const cityParts = [];
    if (addr.neighborhood) cityParts.push(addr.neighborhood);
    if (addr.city) cityParts.push(addr.city);
    if (addr.zip) cityParts.push('CP ' + addr.zip);
    return `
      <div class="checkout-saved-address-item" onclick="selectCheckoutAddress(${addr.id})">
        <div class="checkout-saved-address-left">
          <span class="checkout-address-badge"><i class="fas ${icon}"></i> ${addr.type}</span>
          <p class="checkout-address-main">${addr.address}, ${addr.locality}</p>
          ${addr.instructions ? '<p class="checkout-address-extra">' + addr.instructions + '</p>' : ''}
          ${cityParts.length ? '<p class="checkout-address-city">' + cityParts.join(', ') + '</p>' : ''}
        </div>
        <i class="fas fa-chevron-right checkout-saved-address-arrow"></i>
      </div>
    `;
  }).join('');

  listDiv.style.display = 'block';
}

function showCheckoutAddressModal() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');
  const container = document.getElementById('addressSelectList');

  if (addresses.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#999;padding:20px">No tienes direcciones guardadas.</p>';
  } else {
    container.innerHTML = addresses.map(addr => {
      const icon = addr.type === 'Casa' ? 'fa-home' : addr.type === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
      const cityParts = [];
      if (addr.neighborhood) cityParts.push(addr.neighborhood);
      if (addr.city) cityParts.push(addr.city);
      if (addr.zip) cityParts.push('CP ' + addr.zip);
      return `
        <div class="checkout-saved-address-item" onclick="selectCheckoutAddress(${addr.id}); document.getElementById('addressSelectModal').style.display='none'">
          <div class="checkout-saved-address-left">
            <span class="checkout-address-badge"><i class="fas ${icon}"></i> ${addr.type}</span>
            <p class="checkout-address-main">${addr.address}, ${addr.locality}</p>
            ${addr.instructions ? '<p class="checkout-address-extra">' + addr.instructions + '</p>' : ''}
            ${cityParts.length ? '<p class="checkout-address-city">' + cityParts.join(', ') + '</p>' : ''}
          </div>
          <i class="fas fa-chevron-right checkout-saved-address-arrow"></i>
        </div>
      `;
    }).join('');
  }

  document.getElementById('addressSelectModal').style.display = 'flex';
}

function selectCheckoutAddress(id) {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');
  const addr = addresses.find(a => a.id === id);
  if (!addr) return;

  selectedCheckoutAddrData = addr;

  const icon = addr.type === 'Casa' ? 'fa-home' : addr.type === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
  document.getElementById('checkoutAddressTypeBadge').innerHTML = '<i class="fas ' + icon + '"></i> ' + addr.type;
  document.getElementById('checkoutAddressText').textContent = addr.address + ', ' + addr.locality;
  const instrEl = document.getElementById('checkoutAddressInstructionsText');
  if (addr.instructions) {
    instrEl.textContent = addr.instructions;
    instrEl.style.display = 'block';
  } else {
    instrEl.style.display = 'none';
  }
  const cityParts = [];
  if (addr.neighborhood) cityParts.push(addr.neighborhood);
  if (addr.city) cityParts.push(addr.city);
  if (addr.zip) cityParts.push('CP ' + addr.zip);
  document.getElementById('checkoutAddressCityText').textContent = cityParts.join(', ');

  document.getElementById('checkoutAddressSaved').dataset.hasAddress = 'true';
  document.getElementById('checkoutAddressSaved').style.display = 'block';
  document.getElementById('checkoutAddressEmpty').style.display = 'none';
  document.getElementById('checkoutAddressChangeBtn').style.display = 'inline-flex';
}

function cancelCheckoutAddress() {
  const modal = document.getElementById('addressModal');
  delete modal.dataset.editId;
  modal.style.display = 'none';
  const saved = document.getElementById('checkoutAddressSaved');
  const savedList = document.getElementById('checkoutAddressSavedList');
  const empty = document.getElementById('checkoutAddressEmpty');
  if (saved && saved.dataset.hasAddress === 'true') {
    saved.style.display = 'block';
  } else if (savedList.style.display === 'block') {
    // Keep list visible
  } else {
    empty.style.display = 'block';
  }
  // Clear form
  document.getElementById('checkoutAddress').value = '';
  document.getElementById('checkoutAddressInstructions').value = '';
  document.getElementById('checkoutLocality').value = '';
  document.getElementById('checkoutNeighborhood').value = '';
  document.getElementById('checkoutCity').value = '';
  document.getElementById('checkoutZip').value = '';
  // Reset type selector
  document.querySelectorAll('.address-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.address-type-btn').classList.add('active');
  selectedAddressType = 'Casa';
}

let selectedAddressType = 'Casa';

function selectAddressType(btn, type) {
  document.querySelectorAll('.address-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedAddressType = type;
}

function saveCheckoutAddress() {
  const address = document.getElementById('checkoutAddress').value;
  const instructions = document.getElementById('checkoutAddressInstructions').value;
  const locality = document.getElementById('checkoutLocality').value;
  const neighborhood = document.getElementById('checkoutNeighborhood').value;
  const city = document.getElementById('checkoutCity').value;
  const zip = document.getElementById('checkoutZip').value;

  if (!address || !locality) {
    alert('Dirección y localidad son requeridas');
    return;
  }

  const modal = document.getElementById('addressModal');
  const editId = modal.dataset.editId;

  const userId = currentUser ? currentUser.id || currentUser.email : 'guest';
  const key = 'userAddresses_' + userId;
  let addresses = JSON.parse(localStorage.getItem(key) || '[]');

  if (editId) {
    // Edit existing address
    const idx = addresses.findIndex(a => a.id === parseInt(editId));
    if (idx !== -1) {
      addresses[idx].type = selectedAddressType;
      addresses[idx].address = address;
      addresses[idx].instructions = instructions;
      addresses[idx].locality = locality;
      addresses[idx].neighborhood = neighborhood;
      addresses[idx].city = city;
      addresses[idx].zip = zip;
    }
    delete modal.dataset.editId;
  } else {
    // New address
    const addrData = {
      id: Date.now(),
      type: selectedAddressType,
      address: address,
      instructions: instructions,
      locality: locality,
      neighborhood: neighborhood,
      city: city,
      zip: zip
    };
    addresses.push(addrData);
  }

  localStorage.setItem(key, JSON.stringify(addresses));

  // Show saved address in checkout
  const addr = editId ? addresses.find(a => a.id === parseInt(editId)) : addresses[addresses.length - 1];
  selectedCheckoutAddrData = addr;
  const icon = addr.type === 'Casa' ? 'fa-home' : addr.type === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
  document.getElementById('checkoutAddressTypeBadge').innerHTML = '<i class="fas ' + icon + '"></i> ' + addr.type;
  document.getElementById('checkoutAddressText').textContent = addr.address + ', ' + addr.locality;
  const instrEl = document.getElementById('checkoutAddressInstructionsText');
  if (addr.instructions) {
    instrEl.textContent = addr.instructions;
    instrEl.style.display = 'block';
  } else {
    instrEl.style.display = 'none';
  }
  const cityParts = [];
  if (addr.neighborhood) cityParts.push(addr.neighborhood);
  if (addr.city) cityParts.push(addr.city);
  if (addr.zip) cityParts.push('CP ' + addr.zip);
  document.getElementById('checkoutAddressCityText').textContent = cityParts.join(', ');
  document.getElementById('checkoutAddressSaved').dataset.hasAddress = 'true';
  document.getElementById('addressModal').style.display = 'none';
  document.getElementById('checkoutAddressSaved').style.display = 'block';
  document.getElementById('checkoutAddressEmpty').style.display = 'none';

  // Clear form
  document.getElementById('checkoutAddress').value = '';
  document.getElementById('checkoutAddressInstructions').value = '';
  document.getElementById('checkoutLocality').value = '';
  document.getElementById('checkoutNeighborhood').value = '';
  document.getElementById('checkoutCity').value = '';
  document.getElementById('checkoutZip').value = '';
  // Reset type selector
  document.querySelectorAll('.address-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.address-type-btn').classList.add('active');
  selectedAddressType = 'Casa';

  // Refresh user panel addresses
  loadUserAddresses();
}

function loadUserAddresses() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');
  const container = document.getElementById('userAddressesList');
  if (!container) return;

  if (addresses.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-map-marker-alt"></i><p>No guardaste direcciones aún.</p></div>';
    return;
  }

  container.innerHTML = addresses.map(addr => {
    const icon = addr.type === 'Casa' ? 'fa-home' : addr.type === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
    const cityParts = [];
    if (addr.neighborhood) cityParts.push(addr.neighborhood);
    if (addr.city) cityParts.push(addr.city);
    if (addr.zip) cityParts.push('CP ' + addr.zip);
    return `
      <div class="user-address-card">
        <div class="user-address-card-content">
          <span class="user-address-badge"><i class="fas ${icon}"></i> ${addr.type}</span>
          <p class="user-address-main">${addr.address}, ${addr.locality}</p>
          ${addr.instructions ? '<p class="user-address-extra">' + addr.instructions + '</p>' : ''}
          ${cityParts.length ? '<p class="user-address-city">' + cityParts.join(', ') + '</p>' : ''}
        </div>
        <div class="user-address-actions">
          <button class="user-address-edit-btn" onclick="editUserAddress(${addr.id})" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="user-address-delete-btn" onclick="deleteUserAddress(${addr.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function editUserAddress(id) {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  const addresses = JSON.parse(localStorage.getItem(key) || '[]');
  const addr = addresses.find(a => a.id === id);
  if (!addr) return;

  document.getElementById('checkoutAddress').value = addr.address || '';
  document.getElementById('checkoutAddressInstructions').value = addr.instructions || '';
  document.getElementById('checkoutLocality').value = addr.locality || '';
  document.getElementById('checkoutNeighborhood').value = addr.neighborhood || '';
  document.getElementById('checkoutCity').value = addr.city || '';
  document.getElementById('checkoutZip').value = addr.zip || '';

  const typeBtns = document.querySelectorAll('#addressModal .address-type-btn');
  typeBtns.forEach(b => b.classList.remove('active'));
  typeBtns.forEach(b => {
    if (b.textContent.trim().includes(addr.type)) b.classList.add('active');
  });
  selectedAddressType = addr.type || 'Casa';

  document.getElementById('addressModal').dataset.editId = id;
  document.getElementById('addressModal').style.display = 'flex';
}

function deleteUserAddress(id) {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const key = 'userAddresses_' + userId;
  let addresses = JSON.parse(localStorage.getItem(key) || '[]');
  addresses = addresses.filter(a => a.id !== id);
  localStorage.setItem(key, JSON.stringify(addresses));
  loadUserAddresses();
}

function togglePaymentForm(method) {
  const cardForm = document.getElementById('checkoutCardForm');
  const transferInfo = document.getElementById('checkoutTransferInfo');
  const cashInfo = document.getElementById('checkoutCashInfo');
  if (cardForm) {
    cardForm.style.display = method === 'card' ? 'flex' : 'none';
  }
  if (transferInfo) {
    transferInfo.style.display = method === 'transfer' ? 'block' : 'none';
  }
  if (cashInfo) {
    cashInfo.style.display = method === 'cash' ? 'flex' : 'none';
  }
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  if (!container) return;

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
      <div class="checkout-item-details">
        <span class="checkout-item-name">${item.name}</span>
        <div class="checkout-item-bottom">
          <span class="checkout-item-unit-price">$${item.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
          <div class="checkout-item-qty">
            <button onclick="event.stopPropagation(); updateCheckoutQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="event.stopPropagation(); updateCheckoutQty(${item.id}, 1)">+</button>
          </div>
          <button class="checkout-item-remove" onclick="event.stopPropagation(); removeFromCart(${item.id}); renderCheckoutSummary()"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <span class="checkout-item-total">$${(item.price * item.qty).toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
  if (shippingEl) shippingEl.textContent = subtotal >= 130 ? 'GRATIS' : '$999.00';
  if (totalEl) totalEl.textContent = `$${subtotal.toLocaleString('es-AR', {minimumFractionDigits: 2})}`;
}

let checkoutFromCart = false;

function openCheckout() {
  if (cart.length === 0) {
    toggleCart();
    return;
  }
  checkoutFromCart = true;
  showCheckout();
  toggleCart();
}

function updateCheckoutQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  }
  updateCartUI();
  renderCheckoutSummary();
}

async function submitOrder(e) {
  e.preventDefault();

  const payment = document.querySelector('input[name="paymentMethod"]:checked');
  const address = document.getElementById('checkoutAddressText');
  const userName = document.getElementById('checkoutUserName');
  const userEmail = document.getElementById('checkoutUserEmail');
  const userPhone = document.getElementById('checkoutUserPhone');

  if (!currentUser) {
    alert('Iniciá sesión para continuar');
    return;
  }

  if (!address || address.textContent === '-') {
    alert('Agregá una dirección de entrega');
    return;
  }

  // Get full address data from selectedCheckoutAddrData
  const savedAddr = selectedCheckoutAddrData || {};

  const orderData = {
    customer_name: userName ? userName.textContent : currentUser.name,
    email: userEmail ? userEmail.textContent : currentUser.email,
    phone: userPhone && userPhone.textContent !== 'No especificado' ? userPhone.textContent : '',
    address: address.textContent + (document.getElementById('checkoutAddressCityText').textContent ? ', ' + document.getElementById('checkoutAddressCityText').textContent : ''),
    address_type: savedAddr.type || 'Casa',
    address_street: savedAddr.address || '',
    address_locality: savedAddr.locality || '',
    address_instructions: savedAddr.instructions || '',
    address_neighborhood: savedAddr.neighborhood || '',
    address_city: savedAddr.city || '',
    address_zip: savedAddr.zip || '',
    city: '',
    zip_code: '',
    payment_method: payment ? payment.value : 'card',
    items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, qty: item.qty, image: item.image || '' })),
    total: getCartTotal()
  };

  const result = await apiPost('/orders', orderData);

  cart = [];
  updateCartUI();
  renderCartPanel();

  if (result) {
    const userId = currentUser.id || currentUser.email;
    const key = 'userOrders_' + userId;
    const userOrders = JSON.parse(localStorage.getItem(key) || '[]');
    userOrders.unshift(result);
    localStorage.setItem(key, JSON.stringify(userOrders));
    alert('¡Pedido realizado con éxito! ID: ' + result.id);
  } else {
    alert('¡Pedido realizado con éxito!');
  }

  showView('home');
}

// ========== CAROUSEL ==========
function renderCategoriesCarousel() {
  const container = document.getElementById('categoriesContainer');
  if (!container) return;

  if (categories.length <= 1) {
    container.innerHTML = '<p style="padding:20px;color:#999;text-align:center;width:100%">No hay categorías</p>';
    return;
  }

  const fallbackImages = {
    'Blusas': 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a23?w=135&h=135&fit=crop',
    'Faldas': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=135&h=135&fit=crop',
    'Chaquetas': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=135&h=135&fit=crop',
    'Camisetas': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=135&h=135&fit=crop',
    'Jeans': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=135&h=135&fit=crop',
    'Vestidos': 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=135&h=135&fit=crop',
    'Accesorios': 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=135&h=135&fit=crop',
    'Zapatos': 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=135&h=135&fit=crop',
  };

  container.innerHTML = categories.filter(c => c !== 'Todas').map(cat => {
    const catData = allCategoriesData.find(c => c.name === cat);
    const img = (catData && catData.image) ? catData.image : (fallbackImages[cat] || 'https://placehold.co/135x135?text=' + encodeURIComponent(cat));
    return `
      <div class="category-card" onclick="filterByCategory('${cat}')">
        <div class="category-img-wrapper">
          <img src="${img}" alt="${cat}">
        </div>
        <span class="category-name">${cat}</span>
      </div>
    `;
  }).join('');
}

let allCategoriesData = [];

function initCarousel() {
  const container = document.getElementById('categoriesContainer');
  const prevBtn = document.getElementById('catPrev');
  const nextBtn = document.getElementById('catNext');
  if (!container || !prevBtn || !nextBtn) return;

  const scrollAmount = 170;

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ========== MOBILE SEARCH ==========
function toggleMobileSearch() {
  const bar = document.getElementById('mobileSearchBar');
  if (bar) bar.classList.toggle('active');
}

// ========== BOTTOM NAV ==========
function toggleMobileMenuFromBottom() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('open');
}

// ========== CATEGORIES ACCORDION ==========
function toggleCategoriesAccordion() {
  const accordion = document.getElementById('categoriesAccordion');
  if (!accordion) return;

  const isOpen = accordion.classList.contains('open');
  if (isOpen) {
    accordion.classList.remove('open');
  } else {
    renderCategoriesAccordion();
    accordion.classList.add('open');
  }
}

function renderCategoriesAccordion() {
  const list = document.getElementById('categoriesAccordionList');
  if (!list) return;

  list.innerHTML = categories.map(cat => `
    <div class="categories-accordion-item ${cat === activeCategory ? 'active' : ''}" onclick="selectCategoryFromAccordion('${cat}')">
      ${cat}
    </div>
  `).join('');
}

function selectCategoryFromAccordion(category) {
  activeCategory = category;
  renderProducts(category);
  toggleCategoriesAccordion();
  
  const catalogSection = document.getElementById('catalogo');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function openWhatsApp() {
  window.open('https://wa.me/5491112345678', '_blank');
}

function toggleLoginFromBottom() {
  const items = document.querySelectorAll('.bottom-nav-item');
  items.forEach(item => item.classList.remove('active'));
  
  const loginItem = document.querySelector('.bottom-nav-item[onclick="toggleLoginFromBottom()"]');
  if (loginItem) loginItem.classList.add('active');
  
  toggleLoginPanel();
}

// ========== LOGIN ==========
let currentUser = null;

function toggleLoginPanel() {
  if (currentUser) {
    showView('userPanel');
  } else {
    showView('login');
  }
}

function showLoginView() {
  document.getElementById('loginCard').style.display = 'block';
  document.getElementById('registerCard').style.display = 'none';
}

function showRegisterView() {
  document.getElementById('loginCard').style.display = 'none';
  document.getElementById('registerCard').style.display = 'block';
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }

  const result = await apiPost('/users/login', { email, password });
  
  if (result && result.error) {
    alert(result.error);
    return;
  }

  currentUser = {
    id: result.id,
    name: result.first_name + ' ' + result.last_name,
    first_name: result.first_name,
    last_name: result.last_name,
    email: result.email,
    phone: result.phone
  };

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  showView('userPanel');
}

async function handleRegister() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const phone = document.getElementById('registerPhone').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const nameParts = name.trim().split(' ');
  const first_name = nameParts[0];
  const last_name = nameParts.slice(1).join(' ') || first_name;

  const result = await apiPost('/users', { first_name, last_name, email, phone, password });
  
  if (result.error) {
    alert('Error: ' + result.error);
    return;
  }

  currentUser = { 
    id: result.id,
    name: result.first_name + ' ' + result.last_name,
    first_name: result.first_name,
    last_name: result.last_name,
    email: result.email,
    phone: result.phone
  };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  alert('Cuenta creada exitosamente');
  showView('userPanel');
  document.getElementById('registerName').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPhone').value = '';
  document.getElementById('registerPassword').value = '';
  document.getElementById('registerConfirmPassword').value = '';
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  showView('home');
}

function updateUserPanel() {
  if (currentUser) {
    document.getElementById('userPanelName').textContent = currentUser.name;
    document.getElementById('userPanelInitial').textContent = currentUser.name.charAt(0).toUpperCase();
    
    const badge = document.getElementById('userPanelBadge');
    if (currentUser.phone) {
      badge.innerHTML = 'Cliente <span class="verified"><i class="fas fa-check-circle"></i> verificado</span>';
    } else {
      badge.textContent = 'Cliente';
    }

    // Update stat counts
    updateUserPanelStats();
  }
}

function updateUserPanelStats() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;

  // Orders from localStorage
  const orders = JSON.parse(localStorage.getItem('userOrders_' + userId) || '[]');
  const ordersEl = document.getElementById('userStatOrders');
  if (ordersEl) ordersEl.textContent = orders.length;

  // Addresses from localStorage
  const addresses = JSON.parse(localStorage.getItem('userAddresses_' + userId) || '[]');
  const addressesEl = document.getElementById('userStatAddresses');
  if (addressesEl) addressesEl.textContent = addresses.length;

  // Wishlist
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const wishlistEl = document.getElementById('userStatWishlist');
  if (wishlistEl) wishlistEl.textContent = wishlist.length;

  // Último pedido
  const lastOrderEl = document.getElementById('userLastOrder');
  if (lastOrderEl) {
    if (orders.length > 0) {
      const last = orders[0];
      let items = [];
      try { items = typeof last.items === 'string' ? JSON.parse(last.items) : (last.items || []); } catch(e) {}
      const productName = items[0] ? items[0].name : 'Producto';
      const date = new Date(last.created_at).toLocaleDateString('es-AR');
      lastOrderEl.innerHTML = '<strong>#ORD-' + String(last.id).padStart(3, '0') + '</strong> - ' + date +
        '<br><span style="color:var(--text-light);font-size:0.82rem">' + productName + '</span>' +
        '<br><strong style="color:var(--primary)">$' + parseFloat(last.total).toLocaleString('es-AR', {minimumFractionDigits:2}) + '</strong>';
    } else {
      lastOrderEl.textContent = 'No realizaste pedidos aún.';
    }
  }

  // Dirección principal
  const mainAddrEl = document.getElementById('userMainAddress');
  if (mainAddrEl) {
    if (addresses.length > 0) {
      const main = addresses[0];
      mainAddrEl.innerHTML = '<strong>' + main.type + '</strong><br>' +
        main.address + ', ' + main.locality +
        (main.city ? '<br>' + main.city : '') +
        (main.zip ? ', CP ' + main.zip : '');
    } else {
      mainAddrEl.textContent = 'No guardaste direcciones aún.';
    }
  }
}

function renderUserOrders() {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const orders = JSON.parse(localStorage.getItem('userOrders_' + userId) || '[]');
  const container = document.getElementById('userOrdersList');

  if (orders.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-box"></i><p>No realizaste pedidos aún.</p></div>';
    return;
  }

  const statusColors = {
    'Pendiente': '#e67e22',
    'Enviado': '#3498db',
    'Completado': '#27ae60',
    'Cancelado': '#e74c3c'
  };

  container.innerHTML = '<div class="user-orders-header"><h2>Mis pedidos <span class="user-orders-count">(' + orders.length + ')</span></h2></div>' +
  orders.map(order => {
    let items = [];
    try { items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []); } catch(e) {}
    const firstItem = items[0];
    const status = order.status || 'Pendiente';
    const statusColor = statusColors[status] || '#999';
    const date = new Date(order.created_at).toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    const productLine = firstItem ? firstItem.name + (firstItem.qty > 1 ? ' x' + firstItem.qty : '') : 'Producto';

    return '<div class="user-order-card">' +
      '<div class="user-order-top-row">' +
        '<span class="user-order-id">#ORD-' + String(order.id).padStart(3, '0') + '</span>' +
        '<span class="user-order-date">' + date + '</span>' +
        '<span class="user-order-status" style="background:' + statusColor + '20;color:' + statusColor + ';border:1px solid ' + statusColor + '40">' + status + '</span>' +
      '</div>' +
      '<div class="user-order-middle-row">' +
        '<span class="user-order-product-line">' + productLine + '</span>' +
      '</div>' +
      '<div class="user-order-bottom-row">' +
        '<span class="user-order-total">$' + parseFloat(order.total).toLocaleString('es-AR', {minimumFractionDigits:2}) + '</span>' +
        '<button class="user-order-view-btn" onclick="showUserOrderDetail(' + order.id + ')">Ver</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function showUserOrderDetail(orderId) {
  if (!currentUser) return;
  const userId = currentUser.id || currentUser.email;
  const orders = JSON.parse(localStorage.getItem('userOrders_' + userId) || '[]');
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  let items = [];
  try { items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []); } catch(e) {}

  const statusColors = {
    'Pendiente': '#e67e22',
    'Enviado': '#3498db',
    'Completado': '#27ae60',
    'Cancelado': '#e74c3c'
  };
  const status = order.status || 'Pendiente';

  const addrType = order.address_type || 'Casa';
  const addrIcon = addrType === 'Casa' ? 'fa-home' : addrType === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
  const hasStructuredAddr = order.address_street || order.address_locality;

  let addressHTML = '';
  if (hasStructuredAddr) {
    addressHTML = '<span class="user-address-badge"><i class="fas ' + addrIcon + '"></i> ' + addrType + '</span>' +
      '<p class="user-address-main">' + (order.address_street || '') + ', ' + (order.address_locality || '') + '</p>' +
      (order.address_instructions ? '<p class="user-address-extra"><em>' + order.address_instructions + '</em></p>' : '') +
      '<p class="user-address-city">' + [order.address_neighborhood, order.address_city, order.address_zip ? 'CP ' + order.address_zip : ''].filter(Boolean).join(', ') + '</p>';
  } else {
    addressHTML = '<span class="user-address-badge"><i class="fas ' + addrIcon + '"></i> ' + addrType + '</span>' +
      '<p class="user-address-main">' + (order.address || '-') + '</p>';
  }

  document.getElementById('userOrderDetailContent').innerHTML =
    '<div class="user-order-detail-header">' +
      '<h3>Pedido #ORD-' + String(order.id).padStart(3, '0') + '</h3>' +
      '<span class="user-order-status" style="background:' + (statusColors[status] || '#999') + '20;color:' + (statusColors[status] || '#999') + ';border:1px solid ' + (statusColors[status] || '#999') + '40">' + status + '</span>' +
    '</div>' +
    '<p style="color:var(--text-light);font-size:0.85rem;margin-bottom:16px">' + new Date(order.created_at).toLocaleDateString('es-AR') + '</p>' +
    '<h4 style="margin-bottom:8px">Dirección de envío</h4>' +
    '<div class="order-detail-address-box">' + addressHTML + '</div>' +
    '<h4 style="margin-bottom:8px">Productos</h4>' +
    items.map(item => {
      const img = item.image || (() => { const p = products.find(p => p.id === item.id); return p ? p.image : ''; })();
      return '<div class="user-order-detail-item">' +
        (img ? '<img src="' + img + '" alt="">' : '<div class="user-order-detail-item-img-placeholder"><i class="fas fa-box"></i></div>') +
        '<div><p style="font-weight:600">' + item.name + '</p><p style="color:var(--text-light);font-size:0.85rem">x' + item.qty + ' - $' + parseFloat(item.price).toLocaleString('es-AR', {minimumFractionDigits:2}) + '</p></div>' +
      '</div>';
    }).join('') +
    '<div style="border-top:1px solid var(--border);padding-top:12px;margin-top:12px;display:flex;justify-content:space-between;font-weight:700">' +
      '<span>Total</span><span>$' + parseFloat(order.total).toLocaleString('es-AR', {minimumFractionDigits:2}) + '</span>' +
    '</div>';

  document.getElementById('userOrderDetailModal').style.display = 'flex';
}

function closeUserOrderDetail() {
  document.getElementById('userOrderDetailModal').style.display = 'none';
}

function showUserSection(sectionId, btn) {
  const sections = ['panelControl', 'misDatos', 'misPedidos', 'direcciones', 'favoritos'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.user-panel-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  if (sectionId === 'favoritos') {
    renderUserPanelWishlist();
  }

  if (sectionId === 'panelControl') {
    updateUserPanelStats();
  }

  if (sectionId === 'direcciones') {
    loadUserAddresses();
  }

  if (sectionId === 'misPedidos') {
    renderUserOrders();
  }

  if (sectionId === 'misDatos' && currentUser) {
    document.getElementById('editName').value = currentUser.name || '';
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editPhone').value = currentUser.phone || '';
  }
}

function saveUserData() {
  const name = document.getElementById('editName').value;
  const email = document.getElementById('editEmail').value;
  const phone = document.getElementById('editPhone').value;

  if (!name || !email) {
    alert('Por favor completa nombre y email');
    return;
  }

  currentUser.name = name;
  currentUser.email = email;
  currentUser.phone = phone;

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateUserPanel();
  alert('Datos guardados correctamente');
}

function renderUserPanelWishlist() {
  const container = document.getElementById('userPanelWishlistItems');
  const emptyState = document.getElementById('userPanelWishlistEmpty');
  
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = wishlist.map(p => `
    <div class="wishlist-item">
      <img src="${p.image}" alt="${p.name}" class="wishlist-item-img" onclick="navigateToProductId(${p.id})">
      <div class="wishlist-item-info">
        <div class="wishlist-item-name">${p.name}</div>
        <div class="wishlist-item-price">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</div>
      </div>
      <button class="wishlist-item-remove" onclick="removeFromWishlist(${p.id}); renderUserPanelWishlist();">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
}

function checkLoggedInUser() {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
}

function updateBottomCartCount() {
  const el = document.querySelector('.bottom-cart-count');
  if (el) {
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    el.textContent = total;
  }
}

// ========== SEARCH ==========
function initSearch() {
  const input = document.querySelector('.search-input');
  const mobileInput = document.querySelector('.mobile-search-input');
  const dropdowns = document.querySelectorAll('.search-dropdown');

  function getDropdown() {
    return window.innerWidth <= 1024
      ? document.getElementById('searchDropdown')
      : document.querySelector('.search-bar .search-dropdown');
  }

  function renderSearchRow(p) {
    return `
      <div class="search-row" onclick="selectSearchResult(${p.id})">
        <img src="${p.image}" alt="${p.name}" class="search-row-img">
        <div class="search-row-info">
          <span class="search-row-name">${p.name}</span>
          <span class="search-row-price">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
        </div>
      </div>
    `;
  }

  function renderGridCard(p) {
    const starsHtml = renderStars(p.rating);
    const originalPriceHtml = p.originalPrice
      ? `<span class="price-original">$${p.originalPrice.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>`
      : '';
    const discountHtml = p.discount > 0
      ? `<div class="discount-badge">-${p.discount}%</div>`
      : '';

    return `
      <div class="product-card">
        <div class="product-img-wrapper" onclick="navigateToProductId(${p.id})">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          ${discountHtml}
        </div>
        <button class="wishlist-icon ${isInWishlist(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); addToWishlist(${p.id})">
          <i class="${isInWishlist(p.id) ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <div class="product-info">
          <div class="product-info-content">
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <span class="stars">${starsHtml}</span>
              <span class="rating-count">(${p.reviews})</span>
            </div>
            <div class="product-price">
              <span class="price-current">$${p.price.toLocaleString('es-AR', {minimumFractionDigits: 2})}</span>
              ${originalPriceHtml}
            </div>
          </div>
          <button class="product-buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const dropdown = getDropdown();

    if (!query) {
      if (dropdown) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');
      }
      return;
    }

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );

    if (dropdown) {
      if (filtered.length === 0) {
        dropdown.innerHTML = `<div class="search-row"><span class="search-row-name">Sin resultados</span></div>`;
      } else {
        dropdown.innerHTML = filtered.map(renderSearchRow).join('');
      }
      dropdown.classList.add('active');
    }
  }

  if (input) input.addEventListener('input', handleSearch);
  if (mobileInput) mobileInput.addEventListener('input', handleSearch);

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar') && !e.target.closest('.mobile-search-bar')) {
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });
}

function selectSearchResult(id) {
  const dropdown = document.getElementById('searchDropdown');
  if (dropdown) dropdown.classList.remove('active');
  navigateToProductId(id);
}

// ========== BANNER SLIDER ==========
let currentSlideIndex = 0;
let bannerSlidesData = [];
let slideInterval;

function renderBanner() {
  const container = document.getElementById('bannerSlides');
  const dotsContainer = document.getElementById('bannerDots');
  if (!container || !bannerSlidesData || bannerSlidesData.length === 0) return;

  if (bannerSlidesData.length === 1) {
    const s = bannerSlidesData[0];
    container.innerHTML = `
      <div class="banner-slide active" style="background-image: url('${s.image || ''}')">
        <div class="banner-content">
          <span class="banner-tag">${s.title}</span>
          <h1 class="banner-title">${s.subtitle || ''}</h1>
          <a href="${s.link || '#catalogo'}" class="banner-btn">${s.button_text || 'Ver más'}</a>
        </div>
      </div>
    `;
    document.querySelector('.banner-prev').style.display = 'none';
    document.querySelector('.banner-next').style.display = 'none';
    dotsContainer.style.display = 'none';
    return;
  }

  container.innerHTML = bannerSlidesData.map((s, i) => `
    <div class="banner-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${s.image || ''}')">
      <div class="banner-content">
        <span class="banner-tag">${s.title}</span>
        <h1 class="banner-title">${s.subtitle || ''}</h1>
        <a href="${s.link || '#catalogo'}" class="banner-btn">${s.button_text || 'Ver más'}</a>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = bannerSlidesData.map((_, i) => `
    <div class="banner-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>
  `).join('');

  startSlideInterval();
}

function startSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function nextSlide() {
  if (bannerSlidesData.length <= 1) return;
  currentSlideIndex = (currentSlideIndex + 1) % bannerSlidesData.length;
  updateSlide();
}

function prevSlide() {
  if (bannerSlidesData.length <= 1) return;
  currentSlideIndex = (currentSlideIndex - 1 + bannerSlidesData.length) % bannerSlidesData.length;
  updateSlide();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateSlide();
  startSlideInterval();
}

function updateSlide() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlideIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlideIndex));
}

async function loadBannerSlides() {
  const slides = await apiGet('/slides/active');
  if (slides && slides.length > 0) {
    bannerSlidesData = slides;
  } else {
    bannerSlidesData = [{
      title: 'Nueva Colección',
      subtitle: 'Hasta 50% de descuento',
      button_text: 'Ver Catálogo',
      link: '#catalogo',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop'
    }];
  }
  renderBanner();
}

// ========== SPLIT BANNERS ==========
const defaultSplitBanners = [
  {
    title: 'The Art of Writing',
    subtitle: 'Descubre nuestra nueva colección de accesorios premium',
    link: '#catalogo',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=400&fit=crop',
    button_text: 'Descubrir →',
    position: 1
  },
  {
    title: 'Iconic Shades',
    subtitle: 'Estilo atemporal que combina con cualquier look',
    link: '#catalogo',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=400&fit=crop',
    button_text: 'Ver Colección →',
    position: 2
  }
];

function renderSplitBanners(banners) {
  const section = document.getElementById('splitBannersSection');
  if (!section || !banners || banners.length === 0) return;

  const inner = section.querySelector('.split-banners-inner');
  if (!inner) return;

  inner.innerHTML = banners.slice(0, 2).map((b, i) => `
    <div class="split-banner-item" id="splitBanner${i + 1}">
      <img src="${b.image || 'https://placehold.co/800x400'}" alt="${b.title}">
      <div class="split-banner-content ${i === 1 ? 'right' : ''}">
        <h2>${b.title}</h2>
        <p>${b.subtitle || ''}</p>
        <a href="${b.link || '#catalogo'}" class="split-banner-btn">${b.button_text || 'Ver más'} →</a>
      </div>
    </div>
  `).join('');
}

async function loadSplitBanners() {
  const banners = await apiGet('/split-banners/active');
  if (banners && banners.length > 0) {
    renderSplitBanners(banners);
  } else {
    renderSplitBanners(defaultSplitBanners);
  }
}

// ========== INIT ==========
async function initApp() {
  const loadingEl = document.getElementById('loadingView');
  if (loadingEl) loadingEl.style.display = '';

  // Check if admin route
  if (window.location.pathname === '/admin') {
    if (loadingEl) loadingEl.style.display = 'none';
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      adminLoggedIn = true;
      showView('admin');
      loadAdminDashboard();
    } else {
      showAdminLogin();
    }
    return;
  }

  // Try to load from API first, fallback to local data
  const apiProducts = await apiGet('/products');
  if (apiProducts && apiProducts.length > 0) {
    products.length = 0;
    apiProducts.forEach(p => {
      let images = [];
      if (p.images && Array.isArray(p.images) && p.images.length > 0) {
        images = p.images;
      } else if (p.image) {
        images = [p.image];
      }
      
      let sizes = [];
      if (p.sizes && typeof p.sizes === 'string' && p.sizes.trim()) {
        sizes = p.sizes.split(',').map(s => s.trim());
      } else {
        sizes = ["S", "M", "L", "XL"];
      }
      
      let colors = [];
      if (p.colors && typeof p.colors === 'string' && p.colors.trim()) {
        colors = p.colors.split(',').map(c => c.trim());
      } else {
        colors = ["Negro", "Blanco"];
      }

      products.push({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price),
        originalPrice: p.original_price ? parseFloat(p.original_price) : null,
        discount: p.discount,
        rating: parseFloat(p.rating) || 4.5,
        reviews: p.reviews || 0,
        category: p.category,
        image: images[0] || p.image,
        images: images,
        features: [
          "Tejido de alta calidad",
          "Diseño moderno y cómodo",
          "Perfecto para el día a día"
        ],
        sizes: sizes,
        colors: colors,
        description: p.description,
        specs: {
          "Composición": "Textil",
          "Talla": sizes.join(', '),
          "Peso": "0.3 kg",
          "Origen": "Argentina"
        }
      });
    });
  }

  const apiCategories = await apiGet('/categories');
  if (apiCategories && apiCategories.length > 0) {
    allCategoriesData = apiCategories;
    categories.length = 0;
    categories.push('Todas');
    apiCategories.forEach(c => categories.push(c.name));
  } else {
    allCategoriesData = [];
    categories.length = 0;
    categories.push('Todas');
    const apiProducts = await apiGet('/products');
    if (apiProducts) {
      const unique = [...new Set(apiProducts.map(p => p.category).filter(Boolean))];
      unique.forEach(cat => categories.push(cat));
    }
  }

  if (loadingEl) loadingEl.style.display = 'none';

  renderFilters();
  renderProducts();
  renderCategoriesCarousel();
  loadBannerSlides();
  loadSplitBanners();
  initCarousel();
  initMobileMenu();
  initSearch();
  checkLoggedInUser();

  // Load wishlist from localStorage
  const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  if (savedWishlist.length > 0) {
    wishlist = savedWishlist;
    updateWishlistUI();
  }

  // Load compare list from localStorage
  const savedCompare = JSON.parse(localStorage.getItem('compareList') || '[]');
  if (savedCompare.length > 0) {
    compareList = savedCompare;
    updateCompareUI();
  }

  document.querySelector('.cart-btn')?.addEventListener('click', toggleCart);
  document.getElementById('cartOverlay')?.addEventListener('click', toggleCart);
  document.addEventListener('click', closeFilterDropdown);

  // Handle URL routing (product pages, etc.)
  const routed = handleRoute();
  if (!routed) {
    const savedView = localStorage.getItem('currentView');
    if (savedView && savedView !== 'home' && savedView !== 'loading' && savedView !== 'admin' && savedView !== 'adminLogin') {
      showView(savedView);
    }
  }
}

// ========== ADMIN PANEL ==========
const adminCredentials = { email: 'admin@weboutshop.com', password: 'admin123' };
let adminLoggedIn = false;

function showAdminLogin() {
  showView('adminLogin');
}

function handleAdminLogin() {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  if (email === adminCredentials.email && password === adminCredentials.password) {
    adminLoggedIn = true;
    localStorage.setItem('adminLoggedIn', 'true');
    showView('admin');
    loadAdminDashboard();
  } else {
    alert('Credenciales incorrectas. Usa: admin@weboutshop.com / admin123');
  }
}

function handleAdminLogout() {
  adminLoggedIn = false;
  localStorage.removeItem('adminLoggedIn');
  document.getElementById('adminView').style.display = 'none';
  window.location.href = 'index.html';
}

function showAdminSection(section, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById('admin' + section.charAt(0).toUpperCase() + section.slice(1)).style.display = 'block';
  el?.classList.add('active');

  if (section === 'products') loadAdminProducts();
  else if (section === 'categories') loadAdminCategories();
  else if (section === 'slides') loadAdminSlides();
  else if (section === 'splitBanners') loadAdminSplitBanners();
  else if (section === 'orders') loadAdminOrders();
  else if (section === 'users') loadAdminUsers();
}

async function loadAdminDashboard() {
  const [products, orders, users] = await Promise.all([
    apiGet('/products'),
    apiGet('/orders'),
    apiGet('/users')
  ]);
  document.getElementById('statProducts').textContent = products?.length || 0;
  document.getElementById('statOrders').textContent = orders?.length || 0;
  document.getElementById('statUsers').textContent = users?.length || 0;
  const revenue = (orders || []).reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
  document.getElementById('statRevenue').textContent = '$' + revenue.toLocaleString('es-AR');
}

async function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  await apiDelete('/products/' + id);
  loadAdminProducts();
}

async function loadAdminOrders() {
  const orders = await apiGet('/orders');
  const tbody = document.getElementById('adminOrdersTable');
  const noOrders = document.getElementById('noOrdersMsg');
  if (!orders || orders.length === 0) {
    tbody.innerHTML = '';
    noOrders.style.display = 'block';
    return;
  }
  noOrders.style.display = 'none';
  tbody.innerHTML = orders.map(o => {
    const status = o.status || 'Pendiente';
    return `
    <tr>
      <td><strong>#ORD-${String(o.id).padStart(3, '0')}</strong></td>
      <td>${o.customer_name || 'N/A'}</td>
      <td>${new Date(o.created_at).toLocaleDateString('es-AR')}</td>
      <td>$${parseFloat(o.total).toLocaleString('es-AR', {minimumFractionDigits:2})}</td>
      <td>
        <select class="order-status-select status-${status}" onchange="updateOrderStatusDirect(${o.id}, this.value); updateStatusColor(this)">
          <option value="Pendiente" ${status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option value="Enviado" ${status === 'Enviado' ? 'selected' : ''}>Enviado</option>
          <option value="Completado" ${status === 'Completado' ? 'selected' : ''}>Completado</option>
          <option value="Cancelado" ${status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
        </select>
      </td>
      <td>
        <button class="order-view-btn" onclick='showOrderDetail(${JSON.stringify(o).replace(/'/g, "&#39;")})'>Ver</button>
      </td>
    </tr>
  `}).join('');
}

function updateStatusColor(select) {
  const val = select.value;
  select.className = 'order-status-select status-' + val;
}

let currentOrderDetailId = null;
let selectedCheckoutAddrData = null;

function showOrderDetail(order) {
  currentOrderDetailId = order.id;
  let items = [];
  try { items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []); } catch(e) {}

  document.getElementById('orderDetailId').textContent = '#ORD-' + String(order.id).padStart(3, '0');
  document.getElementById('orderDetailDate').textContent = new Date(order.created_at).toLocaleDateString('es-AR');
  const status = order.status || 'Pendiente';
  const statusSelect = document.getElementById('orderDetailStatus');
  statusSelect.value = status;
  statusSelect.className = 'order-status-select status-' + status;
  document.getElementById('orderDetailCustomer').textContent = order.customer_name || '-';
  document.getElementById('orderDetailEmail').textContent = order.email || '-';
  document.getElementById('orderDetailPhone').textContent = order.phone || '-';
  document.getElementById('orderDetailPayment').textContent = order.payment_method || '-';

  // Address
  const addrType = order.address_type || 'Casa';
  const addrIcon = addrType === 'Casa' ? 'fa-home' : addrType === 'Trabajo' ? 'fa-briefcase' : 'fa-map-marker-alt';
  document.getElementById('orderDetailAddressBadge').innerHTML = '<i class="fas ' + addrIcon + '"></i> ' + addrType;

  const hasStructuredAddr = order.address_street || order.address_locality;
  if (hasStructuredAddr) {
    document.getElementById('orderDetailAddressText').textContent = (order.address_street || '') + ', ' + (order.address_locality || '');
    const instrEl = document.getElementById('orderDetailAddressInstructions');
    if (order.address_instructions) {
      instrEl.textContent = order.address_instructions;
      instrEl.style.display = 'block';
    } else {
      instrEl.style.display = 'none';
    }
    const cityParts = [];
    if (order.address_neighborhood) cityParts.push(order.address_neighborhood);
    if (order.address_city) cityParts.push(order.address_city);
    if (order.address_zip) cityParts.push('CP ' + order.address_zip);
    document.getElementById('orderDetailAddressCity').textContent = cityParts.join(', ');
  } else {
    document.getElementById('orderDetailAddressText').textContent = order.address || '-';
    document.getElementById('orderDetailAddressInstructions').style.display = 'none';
    document.getElementById('orderDetailAddressCity').textContent = '';
  }

  document.getElementById('orderDetailTotal').textContent = '$' + parseFloat(order.total).toLocaleString('es-AR', {minimumFractionDigits:2});

  const tbody = document.getElementById('orderDetailItems');
  tbody.innerHTML = items.map(item => {
    const product = products.find(p => p.id === item.id);
    const img = product ? product.image : '';
    return `
    <tr>
      <td class="order-detail-product-cell">
        ${img ? '<img src="' + img + '" class="order-detail-product-img">' : ''}
        <span>${item.name}</span>
      </td>
      <td></td>
      <td>${item.qty}</td>
      <td>$${parseFloat(item.price).toLocaleString('es-AR', {minimumFractionDigits:2})}</td>
      <td>$${parseFloat(item.price * item.qty).toLocaleString('es-AR', {minimumFractionDigits:2})}</td>
    </tr>
  `}).join('');

  document.getElementById('orderDetailModal').style.display = 'flex';
}

function closeOrderDetailModal() {
  document.getElementById('orderDetailModal').style.display = 'none';
  currentOrderDetailId = null;
}

function printOrderDetail() {
  const modal = document.getElementById('orderDetailModal');
  const content = modal.querySelector('.admin-modal-body').innerHTML;
  const id = document.getElementById('orderDetailId').textContent;
  const win = window.open('', '', 'width=800,height=600');
  win.document.write(`
    <html><head><title>Pedido ${id}</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
      h4 { margin: 16px 0 8px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
      table { width: 100%; border-collapse: collapse; margin: 10px 0; }
      th, td { padding: 8px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; }
      th { font-size: 11px; text-transform: uppercase; color: #999; }
      .order-detail-product-img { width: 32px; height: 32px; object-fit: cover; border-radius: 4px; margin-right: 8px; vertical-align: middle; }
      .order-detail-product-cell { display: flex; align-items: center; gap: 8px; }
      .order-detail-field label { font-size: 11px; color: #999; display: block; }
      .order-detail-field span { font-size: 13px; }
      .order-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .order-detail-address-box { background: #f5f5f5; padding: 10px; border-radius: 6px; margin: 8px 0; font-size: 13px; }
      .order-detail-total { text-align: right; font-size: 16px; font-weight: bold; margin-top: 12px; border-top: 1px solid #ddd; padding-top: 8px; }
    </style></head><body>
    <h2>Pedido ${id}</h2>
    ${content}
    </body></html>
  `);
  win.document.close();
  win.print();
}

function shareOrderDetail() {
  const id = document.getElementById('orderDetailId').textContent;
  const customer = document.getElementById('orderDetailCustomer').textContent;
  const total = document.getElementById('orderDetailTotal').textContent;
  const text = `Pedido ${id} - Cliente: ${customer} - Total: ${total}`;

  if (navigator.share) {
    navigator.share({ title: 'Pedido ' + id, text: text })
      .catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Pedido copiado al portapapeles');
    });
  } else {
    prompt('Copia la info del pedido:', text);
  }
}

async function updateOrderStatus() {
  if (!currentOrderDetailId) return;
  const status = document.getElementById('orderDetailStatus').value;
  await apiPut('/orders/' + currentOrderDetailId, { status });
  loadAdminOrders();
}

async function updateOrderStatusDirect(id, status) {
  await apiPut('/orders/' + id, { status });
}

async function loadAdminUsers() {
  const users = await apiGet('/users');
  const tbody = document.getElementById('adminUsersTable');
  if (!users || users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="admin-empty-text">No hay usuarios registrados.</td></tr>';
    return;
  }
  tbody.innerHTML = users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.first_name} ${u.last_name}</td>
      <td>${u.email}</td>
      <td>${u.phone || '-'}</td>
      <td><span class="status-badge confirmed">Activo</span></td>
      <td>
        <button class="action-btn" title="Ver" onclick='showUserDetail(${JSON.stringify(u)})'><i class="fas fa-eye"></i></button>
      </td>
    </tr>
  `).join('');
}

function showUserDetail(user) {
  document.getElementById('userDetailName').textContent = user.first_name + ' ' + user.last_name;
  document.getElementById('userDetailEmail').textContent = user.email;
  document.getElementById('userDetailPhone').textContent = user.phone || '-';
  document.getElementById('userDetailDate').textContent = user.created_at ? new Date(user.created_at).toLocaleDateString('es-AR') : '-';
  document.getElementById('userDetailModal').style.display = 'flex';
}

function closeUserDetailModal() {
  document.getElementById('userDetailModal').style.display = 'none';
}

// ========== PRODUCTS MANAGEMENT ==========
let productImages = { 1: null, 2: null, 3: null, 4: null, 5: null };

async function loadAdminProducts() {
  const products = await apiGet('/products');
  const tbody = document.getElementById('adminProductsTable');
  if (!products || products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="admin-empty-text">No hay productos.</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${Array.isArray(p.images) ? p.images[0] : p.image}" class="product-img" onerror="this.src='https://placehold.co/50'"></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price}</td>
      <td>${p.stock || 0}</td>
      <td>
        <button class="action-btn" title="Editar" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" title="Eliminar" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function showAddProductModal() {
  document.getElementById('productModalTitle').textContent = 'Agregar Producto';
  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productOriginalPrice').value = '';
  document.getElementById('productDiscount').value = '';
  document.getElementById('productStock').value = '';
  document.getElementById('productSizes').value = '';
  document.getElementById('productColors').value = '';
  document.getElementById('productDescription').value = '';
  
  for (let i = 1; i <= 5; i++) {
    productImages[i] = null;
    document.getElementById('productImagePreview' + i).style.display = 'none';
    document.getElementById('productImagePlaceholder' + i).style.display = 'flex';
    document.getElementById('productImageInput' + i).value = '';
  }
  
  loadProductCategories();
  document.getElementById('productModal').style.display = 'flex';
}

async function editProduct(id) {
  const product = await apiGet('/products/' + id);
  if (!product) return;
  
  document.getElementById('productModalTitle').textContent = 'Editar Producto';
  document.getElementById('productId').value = product.id;
  document.getElementById('productName').value = product.name;
  document.getElementById('productPrice').value = product.price;
  document.getElementById('productOriginalPrice').value = product.original_price || '';
  document.getElementById('productDiscount').value = product.discount || '';
  document.getElementById('productStock').value = product.stock || 0;
  document.getElementById('productSizes').value = product.sizes || '';
  document.getElementById('productColors').value = product.colors || '';
  document.getElementById('productDescription').value = product.description || '';
  
  const images = product.images || (product.image ? [product.image] : []);
  for (let i = 1; i <= 5; i++) {
    if (images[i - 1]) {
      productImages[i] = images[i - 1];
      document.getElementById('productImagePreview' + i).src = images[i - 1];
      document.getElementById('productImagePreview' + i).style.display = 'block';
      document.getElementById('productImagePlaceholder' + i).style.display = 'none';
    } else {
      productImages[i] = null;
      document.getElementById('productImagePreview' + i).style.display = 'none';
      document.getElementById('productImagePlaceholder' + i).style.display = 'flex';
    }
    document.getElementById('productImageInput' + i).value = '';
  }
  
  await loadProductCategories(product.category);
  document.getElementById('productModal').style.display = 'flex';
}

async function loadProductCategories(selected) {
  const categories = await apiGet('/categories');
  const select = document.getElementById('productCategory');
  select.innerHTML = '<option value="">Seleccionar categoría</option>';
  if (categories) {
    categories.forEach(c => {
      select.innerHTML += `<option value="${c.name}" ${c.name === selected ? 'selected' : ''}>${c.name}</option>`;
    });
  }
}

function closeProductModal() {
  document.getElementById('productModal').style.display = 'none';
}

function previewProductImage(event, slot) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      productImages[slot] = e.target.result;
      document.getElementById('productImagePreview' + slot).src = e.target.result;
      document.getElementById('productImagePreview' + slot).style.display = 'block';
      document.getElementById('productImagePlaceholder' + slot).style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

async function saveProduct() {
  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value.trim();
  const price = document.getElementById('productPrice').value;
  const original_price = document.getElementById('productOriginalPrice').value || null;
  const discount = document.getElementById('productDiscount').value || 0;
  const stock = document.getElementById('productStock').value || 0;
  const category = document.getElementById('productCategory').value;
  const sizes = document.getElementById('productSizes').value.trim();
  const colors = document.getElementById('productColors').value.trim();
  const description = document.getElementById('productDescription').value.trim();
  
  const images = [];
  for (let i = 1; i <= 5; i++) {
    if (productImages[i]) {
      images.push(productImages[i]);
    }
  }
  
  if (!name || !price || !category) {
    alert('Nombre, precio y categoría son requeridos');
    return;
  }

  const data = { name, price, original_price, discount, stock, category, sizes, colors, images, description };
  
  if (id) {
    await apiPut('/products/' + id, data);
  } else {
    await apiPost('/products', data);
  }
  
  closeProductModal();
  loadAdminProducts();
}

async function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  await apiDelete('/products/' + id);
  loadAdminProducts();
}

// ========== CATEGORIES MANAGEMENT ==========
async function loadAdminCategories() {
  const categories = await apiGet('/categories');
  const products = await apiGet('/products');
  const tbody = document.getElementById('adminCategoriesTable');
  
  if (!categories || categories.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="admin-empty-text">No hay categorías.</td></tr>';
    return;
  }

  tbody.innerHTML = categories.map(c => {
    const productCount = products ? products.filter(p => p.category === c.name).length : 0;
    const slug = c.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const imageHtml = c.image 
      ? `<img src="${c.image}" class="product-img" onerror="this.src='https://placehold.co/50'">`
      : `<img src="https://placehold.co/50" class="product-img">`;
    return `
    <tr>
      <td>${c.id}</td>
      <td>${imageHtml}</td>
      <td>${c.name}</td>
      <td>${slug}</td>
      <td>${productCount}</td>
      <td>
        <button class="action-btn" title="Editar" onclick="editCategory(${c.id}, '${c.name}', '${c.image || ''}')"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" title="Eliminar" onclick="deleteCategory(${c.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `}).join('');
}

function showCategoryModal() {
  document.getElementById('categoryModalTitle').textContent = 'Agregar Categoría';
  document.getElementById('categoryId').value = '';
  document.getElementById('categoryName').value = '';
  document.getElementById('categorySlug').value = '';
  document.getElementById('categoryImagePreview').style.display = 'none';
  document.getElementById('categoryImagePlaceholder').style.display = 'block';
  document.getElementById('categoryImageInput').value = '';
  document.getElementById('categoryModal').style.display = 'flex';
}

function editCategory(id, name, image) {
  document.getElementById('categoryModalTitle').textContent = 'Editar Categoría';
  document.getElementById('categoryId').value = id;
  document.getElementById('categoryName').value = name;
  document.getElementById('categorySlug').value = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  if (image) {
    categoryImageData = image;
    document.getElementById('categoryImagePreview').src = image;
    document.getElementById('categoryImagePreview').style.display = 'block';
    document.getElementById('categoryImagePlaceholder').style.display = 'none';
  } else {
    categoryImageData = null;
    document.getElementById('categoryImagePreview').style.display = 'none';
    document.getElementById('categoryImagePlaceholder').style.display = 'block';
  }
  
  document.getElementById('categoryImageInput').value = '';
  document.getElementById('categoryModal').style.display = 'flex';
}

function closeCategoryModal() {
  document.getElementById('categoryModal').style.display = 'none';
}

function generateSlug() {
  const name = document.getElementById('categoryName').value;
  const slug = name.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  document.getElementById('categorySlug').value = slug;
}

let categoryImageData = null;

function previewCategoryImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      categoryImageData = e.target.result;
      document.getElementById('categoryImagePreview').src = e.target.result;
      document.getElementById('categoryImagePreview').style.display = 'block';
      document.getElementById('categoryImagePlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

async function saveCategory() {
  const id = document.getElementById('categoryId').value;
  const name = document.getElementById('categoryName').value.trim();
  const image = categoryImageData;
  
  if (!name) {
    alert('El nombre es requerido');
    return;
  }

  if (id) {
    await apiPut('/categories/' + id, { name, image });
  } else {
    await apiPost('/categories', { name, image });
  }
  
  closeCategoryModal();
  loadAdminCategories();
}

async function deleteCategory(id) {
  if (!confirm('¿Eliminar esta categoría?')) return;
  const result = await apiDelete('/categories/' + id);
  if (result && result.error) {
    alert(result.error);
  }
  loadAdminCategories();
}

// ========== SLIDES MANAGEMENT ==========
let slideImageData = null;

async function loadAdminSlides() {
  const slides = await apiGet('/slides');
  const tbody = document.getElementById('adminSlidesTable');
  if (!slides || slides.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="admin-empty-text">No hay slides.</td></tr>';
    return;
  }
  tbody.innerHTML = slides.map(s => {
    const imageHtml = s.image 
      ? `<img src="${s.image}" class="product-img" onerror="this.src='https://placehold.co/50'">`
      : `<img src="https://placehold.co/50" class="product-img">`;
    return `
    <tr>
      <td>${s.id}</td>
      <td>${imageHtml}</td>
      <td>${s.title}</td>
      <td>${s.subtitle || '-'}</td>
      <td>${s.button_text || '-'}</td>
      <td>${s.sort_order}</td>
      <td><span class="status-badge ${s.active ? 'confirmed' : 'cancelled'}">${s.active ? 'Activo' : 'Inactivo'}</span></td>
      <td>
        <button class="action-btn" title="Editar" onclick="editSlide(${s.id})"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" title="Eliminar" onclick="deleteSlide(${s.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `}).join('');
}

function showSlideModal() {
  document.getElementById('slideModalTitle').textContent = 'Agregar Slide';
  document.getElementById('slideId').value = '';
  document.getElementById('slideTitle').value = '';
  document.getElementById('slideSubtitle').value = '';
  document.getElementById('slideLink').value = '#catalogo';
  document.getElementById('slideButtonText').value = 'Ver Catálogo';
  document.getElementById('slideOrder').value = '0';
  document.getElementById('slideActive').value = 'true';
  document.getElementById('slideImagePreview').style.display = 'none';
  document.getElementById('slideImagePlaceholder').style.display = 'block';
  document.getElementById('slideImageInput').value = '';
  slideImageData = null;
  document.getElementById('slideModal').style.display = 'flex';
}

async function editSlide(id) {
  const slides = await apiGet('/slides');
  const slide = slides.find(s => s.id === id);
  if (!slide) return;
  
  document.getElementById('slideModalTitle').textContent = 'Editar Slide';
  document.getElementById('slideId').value = slide.id;
  document.getElementById('slideTitle').value = slide.title;
  document.getElementById('slideSubtitle').value = slide.subtitle || '';
  document.getElementById('slideLink').value = slide.link || '#';
  document.getElementById('slideButtonText').value = slide.button_text || '';
  document.getElementById('slideOrder').value = slide.sort_order || 0;
  document.getElementById('slideActive').value = slide.active ? 'true' : 'false';
  
  if (slide.image) {
    slideImageData = slide.image;
    document.getElementById('slideImagePreview').src = slide.image;
    document.getElementById('slideImagePreview').style.display = 'block';
    document.getElementById('slideImagePlaceholder').style.display = 'none';
  } else {
    slideImageData = null;
    document.getElementById('slideImagePreview').style.display = 'none';
    document.getElementById('slideImagePlaceholder').style.display = 'block';
  }
  
  document.getElementById('slideModal').style.display = 'flex';
}

function closeSlideModal() {
  document.getElementById('slideModal').style.display = 'none';
}

function previewSlideImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      slideImageData = e.target.result;
      document.getElementById('slideImagePreview').src = e.target.result;
      document.getElementById('slideImagePreview').style.display = 'block';
      document.getElementById('slideImagePlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

async function saveSlide() {
  const id = document.getElementById('slideId').value;
  const title = document.getElementById('slideTitle').value.trim();
  const subtitle = document.getElementById('slideSubtitle').value.trim();
  const link = document.getElementById('slideLink').value.trim();
  const button_text = document.getElementById('slideButtonText').value.trim();
  const sort_order = parseInt(document.getElementById('slideOrder').value) || 0;
  const active = document.getElementById('slideActive').value === 'true';
  const image = slideImageData;
  
  if (!title) {
    alert('El título es requerido');
    return;
  }

  const data = { title, subtitle, link, image, button_text, sort_order, active };
  
  if (id) {
    await apiPut('/slides/' + id, data);
  } else {
    await apiPost('/slides', data);
  }
  
  closeSlideModal();
  loadAdminSlides();
}

async function deleteSlide(id) {
  if (!confirm('¿Eliminar este slide?')) return;
  await apiDelete('/slides/' + id);
  loadAdminSlides();
}

// ========== SPLIT BANNERS MANAGEMENT ==========
let splitBannerImageData = null;

async function loadAdminSplitBanners() {
  const banners = await apiGet('/split-banners');
  const tbody = document.getElementById('adminSplitBannersTable');
  if (!banners || banners.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="admin-empty-text">No hay banners.</td></tr>';
    return;
  }
  tbody.innerHTML = banners.map(b => {
    const imageHtml = b.image 
      ? `<img src="${b.image}" class="product-img" onerror="this.src='https://placehold.co/50'">`
      : `<img src="https://placehold.co/50" class="product-img">`;
    return `
    <tr>
      <td>${b.id}</td>
      <td>${imageHtml}</td>
      <td>${b.title}</td>
      <td>${b.subtitle || '-'}</td>
      <td>${b.button_text || '-'}</td>
      <td>${b.position}</td>
      <td><span class="status-badge ${b.active ? 'confirmed' : 'cancelled'}">${b.active ? 'Activo' : 'Inactivo'}</span></td>
      <td>
        <button class="action-btn" title="Editar" onclick="editSplitBanner(${b.id})"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" title="Eliminar" onclick="deleteSplitBanner(${b.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `}).join('');
}

function showSplitBannerModal() {
  document.getElementById('splitBannerModalTitle').textContent = 'Agregar Banner';
  document.getElementById('splitBannerId').value = '';
  document.getElementById('splitBannerTitle').value = '';
  document.getElementById('splitBannerSubtitle').value = '';
  document.getElementById('splitBannerLink').value = '#catalogo';
  document.getElementById('splitBannerButtonText').value = 'Descubrir →';
  document.getElementById('splitBannerPosition').value = '1';
  document.getElementById('splitBannerActive').value = 'true';
  document.getElementById('splitBannerImagePreview').style.display = 'none';
  document.getElementById('splitBannerImagePlaceholder').style.display = 'block';
  document.getElementById('splitBannerImageInput').value = '';
  splitBannerImageData = null;
  document.getElementById('splitBannerModal').style.display = 'flex';
}

async function editSplitBanner(id) {
  const banners = await apiGet('/split-banners');
  const banner = banners.find(b => b.id === id);
  if (!banner) return;
  
  document.getElementById('splitBannerModalTitle').textContent = 'Editar Banner';
  document.getElementById('splitBannerId').value = banner.id;
  document.getElementById('splitBannerTitle').value = banner.title;
  document.getElementById('splitBannerSubtitle').value = banner.subtitle || '';
  document.getElementById('splitBannerLink').value = banner.link || '#';
  document.getElementById('splitBannerButtonText').value = banner.button_text || '';
  document.getElementById('splitBannerPosition').value = banner.position || 1;
  document.getElementById('splitBannerActive').value = banner.active ? 'true' : 'false';
  
  if (banner.image) {
    splitBannerImageData = banner.image;
    document.getElementById('splitBannerImagePreview').src = banner.image;
    document.getElementById('splitBannerImagePreview').style.display = 'block';
    document.getElementById('splitBannerImagePlaceholder').style.display = 'none';
  } else {
    splitBannerImageData = null;
    document.getElementById('splitBannerImagePreview').style.display = 'none';
    document.getElementById('splitBannerImagePlaceholder').style.display = 'block';
  }
  
  document.getElementById('splitBannerModal').style.display = 'flex';
}

function closeSplitBannerModal() {
  document.getElementById('splitBannerModal').style.display = 'none';
}

function previewSplitBannerImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      splitBannerImageData = e.target.result;
      document.getElementById('splitBannerImagePreview').src = e.target.result;
      document.getElementById('splitBannerImagePreview').style.display = 'block';
      document.getElementById('splitBannerImagePlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
}

async function saveSplitBanner() {
  const id = document.getElementById('splitBannerId').value;
  const title = document.getElementById('splitBannerTitle').value.trim();
  const subtitle = document.getElementById('splitBannerSubtitle').value.trim();
  const link = document.getElementById('splitBannerLink').value.trim();
  const button_text = document.getElementById('splitBannerButtonText').value.trim();
  const position = parseInt(document.getElementById('splitBannerPosition').value) || 1;
  const active = document.getElementById('splitBannerActive').value === 'true';
  const image = splitBannerImageData;
  
  if (!title) {
    alert('El título es requerido');
    return;
  }

  const data = { title, subtitle, link, image, button_text, position, active };
  
  if (id) {
    await apiPut('/split-banners/' + id, data);
  } else {
    await apiPost('/split-banners', data);
  }
  
  closeSplitBannerModal();
  loadAdminSplitBanners();
}

async function deleteSplitBanner(id) {
  if (!confirm('¿Eliminar este banner?')) return;
  await apiDelete('/split-banners/' + id);
  loadAdminSplitBanners();
}

document.addEventListener('DOMContentLoaded', initApp);
