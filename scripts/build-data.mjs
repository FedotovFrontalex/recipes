/**
 * Генерирует data/recipes.json из receps.csv.
 * Запуск: npm run build:data
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/csv.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'receps.csv');
const DEST = join(root, 'data', 'recipes.json');

const text = (await readFile(SRC, 'utf8')).replace(/^\uFEFF/, '');
const rows = parseCsv(text);

/** @type {{name: string, category: string, url: string}[]} */
const recipes = [];
const problems = [];

rows.forEach((fields, index) => {
  const line = index + 1;
  if (line === 1 && fields[0] === 'Название') return; // строка заголовка
  if (fields.length !== 3) {
    problems.push(`строка ${line}: ожидалось 3 поля, получено ${fields.length}`);
    return;
  }
  const [name, category, url] = fields.map((f) => f.trim());
  if (!name || !category || !url) {
    problems.push(`строка ${line}: пустое поле в "${fields.join(' | ')}"`);
    return;
  }
  recipes.push({ name, category, url });
});

if (problems.length > 0) {
  console.error(`receps.csv: ошибки парсинга:\n${problems.join('\n')}`);
  process.exit(1);
}

// Категории — в порядке первого появления, со счётчиками
const counts = new Map();
for (const { category } of recipes) {
  counts.set(category, (counts.get(category) ?? 0) + 1);
}
const categories = [...counts].map(([name, count]) => ({ name, count }));

const payload = { total: recipes.length, categories, recipes };
await mkdir(dirname(DEST), { recursive: true });
await writeFile(DEST, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log(`OK: ${recipes.length} рецептов, ${categories.length} категорий → data/recipes.json`);
