import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const catalog = JSON.parse(readFileSync(join(ROOT, 'scripts', 'malvasia-catalog.json'), 'utf8'));

function gourmetProductImage(productId) {
  return `/images/shop/gourmet/${productId.replace('gourmet-', '')}.jpg`;
}

const productsTs = `import { Product, ProductCategory } from '../../../shared/models/product.models';

function gourmetProductImage(productId: string): string {
  return \`/images/shop/gourmet/\${productId.replace('gourmet-', '')}.jpg\`;
}

export const GOURMET_PRODUCTS: Product[] = [
${catalog
  .map(
    (p) => `  {
    id: '${p.id}',
    category: 'gourmet',
    nameKey: 'shop.products.gourmet.${p.key}.name',
    descriptionKey: 'shop.products.gourmet.${p.key}.description',
    image: gourmetProductImage('${p.id}'),
    price: ${p.price},
  },`,
  )
  .join('\n')}
];

export const MERCHANDISING_PRODUCTS: Product[] = ${readFileSync(join(ROOT, 'src/app/pages/shop/data/products.data.ts'), 'utf8').match(/export const MERCHANDISING_PRODUCTS[\s\S]*?];\n/)?.[0] ?? '[]'};

const ALL_PRODUCTS: Product[] = [...GOURMET_PRODUCTS, ...MERCHANDISING_PRODUCTS];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((product) => product.id === id);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return [];

  return ALL_PRODUCTS.filter(
    (product) => product.category === current.category && product.id !== productId,
  ).slice(0, limit);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter((product) => product.category === category);
}
`;

writeFileSync(join(ROOT, 'src/app/pages/shop/data/products.data.ts'), productsTs);

const gourmetEntries = Object.fromEntries(
  catalog.map((p) => [
    p.key,
    {
      name: p.title,
      description: p.description || p.title,
    },
  ]),
);

function toEnglishDescription(text) {
  return text
    .replace(/estuche para regalo/gi, 'Gift box')
    .replace(/el regalo gourmet perfecto/gi, 'The perfect gourmet gift')
    .replace(/lata redonda/gi, 'Round tin')
    .replace(/lata circular abrefácil/gi, 'Easy-open round tin')
    .replace(/lata abrefácil/gi, 'Easy-open tin')
    .replace(/tarro de cristal/gi, 'Glass jar')
    .replace(/barqueta termosellada/gi, 'Heat-sealed tray')
    .replace(/pieza individual envasada al vacío/gi, 'Individual vacuum-packed piece')
    .replace(/bolsa al vacío estuchada/gi, 'Vacuum-packed bag in gift box')
    .replace(/muslos/gi, 'legs')
    .replace(/alas/gi, 'wings');
}

const langs = ['es', 'en', 'fr', 'de', 'it', 'pt', 'jp'];
for (const lang of langs) {
  const filePath = join(ROOT, 'public', 'i18n', `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  const existing = data.shop.products.gourmet ?? {};

  const merged = {};
  for (const item of catalog) {
    const prev = existing[item.key];
    if (lang === 'es') {
      merged[item.key] = gourmetEntries[item.key];
    } else if (lang === 'en') {
      merged[item.key] = {
        name: item.title,
        description: toEnglishDescription(item.description || item.title),
      };
    } else if (prev) {
      merged[item.key] = prev;
    } else {
      merged[item.key] = gourmetEntries[item.key];
    }
  }

  data.shop.products.gourmet = merged;
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Updated ${lang}.json (${Object.keys(merged).length} gourmet products)`);
}

console.log(`products.data.ts updated with ${catalog.length} products`);
