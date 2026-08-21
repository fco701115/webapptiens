const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'weboutshop',
        password: process.env.DB_PASSWORD || 'postgres',
        port: process.env.DB_PORT || 5432,
      }
);

function saveBase64Image(base64Str, prefix) {
  const match = base64Str.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!match) return null;
  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const filename = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);
  return '/uploads/' + filename;
}

async function migrateTable(tableName, imageColumn) {
  const result = await pool.query(`SELECT id, ${imageColumn} FROM ${tableName} WHERE ${imageColumn} IS NOT NULL`);
  let migrated = 0;
  for (const row of result.rows) {
    const val = row[imageColumn];
    if (typeof val === 'string' && val.startsWith('data:image')) {
      const url = saveBase64Image(val, tableName);
      if (url) {
        await pool.query(`UPDATE ${tableName} SET ${imageColumn} = $1 WHERE id = $2`, [url, row.id]);
        migrated++;
        console.log(`  ${tableName}#${row.id}: base64 → ${url}`);
      }
    }
  }
  return migrated;
}

async function migrateArrayTable(tableName, imageColumn) {
  const result = await pool.query(`SELECT id, ${imageColumn} FROM ${tableName} WHERE ${imageColumn} IS NOT NULL`);
  let migrated = 0;
  for (const row of result.rows) {
    let images = row[imageColumn];
    if (typeof images === 'string') {
      try { images = JSON.parse(images); } catch (e) { continue; }
    }
    if (!Array.isArray(images)) continue;
    let changed = false;
    for (let i = 0; i < images.length; i++) {
      if (typeof images[i] === 'string' && images[i].startsWith('data:image')) {
        const url = saveBase64Image(images[i], tableName);
        if (url) { images[i] = url; changed = true; }
      }
    }
    if (changed) {
      await pool.query(`UPDATE ${tableName} SET ${imageColumn} = $1 WHERE id = $2`, [JSON.stringify(images), row.id]);
      migrated++;
      console.log(`  ${tableName}#${row.id}: array base64 → urls`);
    }
  }
  return migrated;
}

async function main() {
  console.log('Migrating base64 images to files...\n');
  let total = 0;
  total += await migrateTable('slides', 'image');
  total += await migrateTable('split_banners', 'image');
  total += await migrateTable('categories', 'image');
  total += await migrateArrayTable('products', 'images');
  console.log(`\nDone. ${total} records migrated.`);
  await pool.end();
}

main().catch(err => { console.error(err); process.exit(1); });
