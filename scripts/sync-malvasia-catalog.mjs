import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BASE = 'https://www.comprarfoiedepato.com';
const OUT_DIR = join(process.cwd(), 'public', 'images', 'shop', 'gourmet');
const MANIFEST = join(process.cwd(), 'scripts', 'malvasia-catalog.json');

const CATEGORY_URLS = [
  '/es/6-foie-gras-fresco',
  '/es/16-foie-gras-entero',
  '/es/23-foie-mi-cuit',
  '/es/20-foie-gras-bodega',
  '/es/17-terrina-de-foie-gras',
  '/es/9-bloc-de-foie-gras',
  '/es/7-parfait-de-foie',
  '/es/8-mousse-de-foie',
  '/es/12-magret-de-pato',
  '/es/19-solomillos-de-pato',
  '/es/11-confit-de-pato',
  '/es/10-jamon-de-pato',
  '/es/13-pate-de-pato',
  '/es/4-productos-de-pato',
  '/es/5-regalos-gourmet',
];

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function toKeySlug(text) {
  const words = slugify(text).split('-').filter(Boolean);
  const camel = words
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join('');
  return camel.replace(/[^a-zA-Z0-9]/g, '');
}

function parseProducts(html) {
  const products = [];
  const blocks = html.split(/<article[^>]*class="[^"]*product-miniature/i);
  for (const block of blocks.slice(1)) {
    const titleMatch = block.match(/titulo-producto[^>]*>[\s\S]*?<a[^>]*>([^<]+)</i);
    const priceMatch = block.match(/class="price"[^>]*>[\s\S]*?([\d]+,\d{2})\s*€/i);
    const imageMatch = block.match(/data-full-size-image-url\s*=\s*"([^"]+)"/i);
    const hrefMatch = block.match(/titulo-producto[^>]*>[\s\S]*?<a href="([^"]+)"/i);
    const descMatch = block.match(/product-description-short[^>]*>([\s\S]*?)<\/div>/i);
    if (!titleMatch) continue;

    const title = titleMatch[1]
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/&amp;/g, '&');

    if (/halal/i.test(title)) continue;

    const price = priceMatch ? Number.parseFloat(priceMatch[1].replace(',', '.')) : 0;
    if (price <= 0) continue;

    const description = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : '';

    products.push({
      title,
      price,
      imageUrl: imageMatch?.[1] ?? null,
      url: hrefMatch?.[1] ?? null,
      description,
      slug: slugify(title),
      key: toKeySlug(title),
    });
  }
  return products;
}

async function fetchPage(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    redirect: 'follow',
  });
  if (!res.ok) return [];
  return parseProducts(await res.text());
}

async function downloadImage(url, destPath) {
  if (existsSync(destPath)) return;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const bySlug = new Map();

  for (const path of CATEGORY_URLS) {
    const products = await fetchPage(path);
    for (const product of products) {
      if (!bySlug.has(product.slug)) bySlug.set(product.slug, product);
    }
  }

  const catalog = [...bySlug.values()].sort((a, b) => a.title.localeCompare(b.title, 'es'));
  mkdirSync(OUT_DIR, { recursive: true });

  const items = [];
  for (const product of catalog) {
    const id = `gourmet-${product.slug}`;
    const imageFile = `${product.slug}.jpg`;
    const imagePath = join(OUT_DIR, imageFile);

    if (product.imageUrl) {
      try {
        await downloadImage(product.imageUrl, imagePath);
      } catch (err) {
        console.warn(`Image fail ${product.slug}: ${err.message}`);
      }
    }

    items.push({
      id,
      slug: product.slug,
      key: product.key,
      title: product.title,
      description: product.description || product.title,
      price: product.price,
      image: `/images/shop/gourmet/${imageFile}`,
      imageUrl: product.imageUrl,
      url: product.url,
    });
  }

  writeFileSync(MANIFEST, JSON.stringify(items, null, 2));
  console.log(`Catalog: ${items.length} products -> ${MANIFEST}`);
}

main().catch(console.error);
