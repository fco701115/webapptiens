-- ========== WEBOUTSHOP DATABASE SCHEMA ==========

-- Create database
CREATE DATABASE weboutshop;

-- Connect to database
\c weboutshop;

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  category VARCHAR(100) NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  zip_code VARCHAR(20),
  payment_method VARCHAR(50),
  items JSONB,
  total DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, price, original_price, discount, rating, reviews, category, image, description) VALUES
('Blusa para dama color gris', 1799.99, 2499.99, 28, 4.8, 124, 'Blusas', 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=750&fit=crop', 'Blusa elegante para dama en color gris.'),
('Vestido floral de verano', 2199.99, 3199.99, 31, 4.9, 89, 'Vestidos', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=750&fit=crop', 'Vestido floral ideal para los días de verano.'),
('Jeans slim fit azul oscuro', 1599.99, NULL, 0, 4.6, 203, 'Jeans', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=750&fit=crop', 'Jeans slim fit en color azul oscuro.'),
('Chaqueta cuero sintético negra', 3499.99, 4999.99, 30, 4.7, 67, 'Chaquetas', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop', 'Chaqueta de cuero sintético en color negro.'),
('Falda midi plisada rosa', 1299.99, NULL, 0, 4.5, 156, 'Faldas', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=750&fit=crop', 'Falda midi plisada en color rosa.'),
('Camiseta algodón blanca', 799.99, 1199.99, 33, 4.4, 312, 'Camisetas', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop', 'Camiseta básica de algodón en color blanco.'),
('Top asimétrico negro', 1099.99, NULL, 0, 4.7, 78, 'Blusas', 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=750&fit=crop', 'Top asimétrico en color negro.'),
('Pantalón palazzo beige', 1899.99, 2699.99, 30, 4.6, 94, 'Jeans', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop', 'Pantalón palazzo en color beige.'),
('Blazer oversize gris marengo', 2999.99, NULL, 0, 4.8, 45, 'Chaquetas', 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=750&fit=crop', 'Blazer oversize en gris marengo.'),
('Bolso crossbody marrón', 1699.99, 2299.99, 26, 4.5, 167, 'Accesorios', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop', 'Bolso crossbody en color marrón.'),
('Zapatillas deportivas blancas', 2499.99, NULL, 0, 4.9, 231, 'Zapatos', 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=750&fit=crop', 'Zapatillas deportivas en color blanco.'),
('Gafas de sol redondas doradas', 899.99, 1399.99, 36, 4.3, 88, 'Accesorios', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop', 'Gafas de sol redondas con montura dorada.');
