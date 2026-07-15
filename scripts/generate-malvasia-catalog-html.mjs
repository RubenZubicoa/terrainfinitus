import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const catalog = JSON.parse(readFileSync(join(ROOT, 'scripts', 'malvasia-catalog.json'), 'utf8'));
const outDir = join(ROOT, 'public', 'documents', 'gourmet');
const outFile = join(outDir, 'catalogo-malvasia.html');

mkdirSync(outDir, { recursive: true });

const rows = catalog
  .map(
    (product) => `
      <tr>
        <td>${escapeHtml(product.title)}</td>
        <td>${escapeHtml(product.description)}</td>
        <td>${product.price.toFixed(2)} €</td>
      </tr>`,
  )
  .join('');

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Catálogo Malvasía | Terra Infinitus</title>
    <style>
      :root {
        color-scheme: light;
        font-family: Georgia, 'Times New Roman', serif;
        line-height: 1.5;
        color: #1f1f1f;
      }
      body {
        margin: 0;
        padding: 2rem;
        background: #fffaf3;
      }
      h1, h2, p {
        margin: 0 0 1rem;
      }
      .meta {
        color: #6b5b4d;
        font-size: 0.95rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1.5rem;
        background: #fff;
      }
      th, td {
        border: 1px solid #d8c4ad;
        padding: 0.75rem;
        text-align: left;
        vertical-align: top;
      }
      th {
        background: #b87333;
        color: #fff;
      }
      tr:nth-child(even) td {
        background: #fff8ef;
      }
      @media print {
        body {
          background: #fff;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <h1>Catálogo Malvasía</h1>
    <p class="meta">Terra Infinitus · Productos del pato Malvasía · ${catalog.length} referencias</p>
    <p>Consulta de referencias y precios de fábrica distribuidos por Terra Infinitus.</p>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Formato / descripción</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>${rows}
      </tbody>
    </table>
  </body>
</html>
`;

writeFileSync(outFile, html, 'utf8');
console.log(`Generated ${outFile} (${catalog.length} products)`);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
