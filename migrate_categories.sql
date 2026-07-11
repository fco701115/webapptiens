-- Crear tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrar categorías existentes de products
INSERT INTO categories (name)
SELECT DISTINCT category FROM products
WHERE category IS NOT NULL AND category != ''
ON CONFLICT (name) DO NOTHING;
