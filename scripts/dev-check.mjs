/**
 * Локальная проверка сайта: поднимает одноразовый статический сервер,
 * запрашивает страницу и ресурсы, проверяет ответ. Сервер гасится сам.
 * Запуск: node scripts/dev-check.mjs
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8642;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
    const filePath = join(root, normalize(rel));
    if (!relative(root, filePath).startsWith('..')) {
      const body = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' });
      res.end(body);
      return;
    }
    res.writeHead(403);
    res.end();
  } catch {
    res.writeHead(404);
    res.end();
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));

/** @param {string} path @returns {Promise<{status: number, text: string}>} */
async function get(path) {
  const res = await fetch(`http://127.0.0.1:${PORT}${path}`);
  return { status: res.status, text: await res.text() };
}

const errors = [];

/** @param {boolean} ok @param {string} label */
function check(ok, label) {
  if (!ok) errors.push(label);
  console.log(`${ok ? 'OK ' : 'FAIL'}  ${label}`);
}

const page = await get('/');
check(page.status === 200, 'GET / → 200');
check(page.text.includes('id="grid"'), 'страница содержит контейнер сетки');
check(page.text.includes('id="search"') && page.text.includes('id="chips"'), 'страница содержит поиск и чипы категорий');
check(page.text.includes('./css/styles.css') && page.text.includes('./js/app.js'), 'пути ресурсов относительные');

const css = await get('/css/styles.css');
check(css.status === 200, 'GET /css/styles.css → 200');
check(css.text.includes('auto-fill, minmax'), 'сетка карточек адаптивная (auto-fill)');
check(css.text.includes('prefers-color-scheme: dark'), 'тёмная тема объявлена');

const app = await get('/js/app.js');
check(app.status === 200, 'GET /js/app.js → 200');
check(app.text.includes("fetch('./data/recipes.json')"), 'app.js грузит данные по относительному пути');
check(app.text.includes('aria-pressed') && app.text.includes('debounceTimer'), 'фильтры: чипы и debounce на месте');

const data = await get('/data/recipes.json');
check(data.status === 200, 'GET /data/recipes.json → 200');
const json = JSON.parse(data.text);
check(json.recipes.length === json.total && json.total >= 280, `в JSON ${json.recipes.length} рецептов (total=${json.total})`);
check(json.categories.length >= 10, `категорий в JSON: ${json.categories.length}`);

server.close();

if (errors.length > 0) {
  console.error(`\nПроверка не пройдена: ${errors.length} ошибок`);
  process.exit(1);
}
console.log('\nСайт полностью отдаётся локально — проверка пройдена');
