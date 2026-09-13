/**
 * Валидирует data/recipes.json на консистентность с receps.csv.
 * Ошибки печатаются в stderr, exit code 1. Запуск: npm run validate
 */
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './lib/csv.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{total: number, categories: {name: string, count: number}[], recipes: {name: string, category: string, url: string}[]}} */
const data = JSON.parse(await readFile(join(root, 'data', 'recipes.json'), 'utf8'));

const errors = [];

if (data.total !== data.recipes.length) {
  errors.push(`total (${data.total}) ≠ числу рецептов (${data.recipes.length})`);
}
if (data.recipes.length < 280) {
  errors.push(`слишком мало рецептов: ${data.recipes.length} (ожидалось ≥ 280)`);
}

const seenUrls = new Set();
data.recipes.forEach((r, i) => {
  const where = `рецепт #${i + 1}`;
  if (!r.name || !r.category || !r.url) errors.push(`${where}: пустое поле`);
  if (r.name.includes('"')) errors.push(`${where}: кавычки-артефакты в названии — "${r.name}"`);
  if (!r.url.startsWith('https://')) errors.push(`${where}: url не https — ${r.url}`);
  if (seenUrls.has(r.url)) errors.push(`${where}: дубликат ссылки — ${r.url}`);
  seenUrls.add(r.url);
});

// Независимая сверка объёма с CSV (заголовок исключаем)
const csvRows = parseCsv((await readFile(join(root, 'receps.csv'), 'utf8')).replace(/^\uFEFF/, ''))
  .filter((fields, i) => !(i === 0 && fields[0] === 'Название'));
if (csvRows.length !== data.recipes.length) {
  errors.push(`объём не сходится: CSV ${csvRows.length} строк, JSON ${data.recipes.length} рецептов`);
}

// Список категорий должен совпадать с подсчётом по рецептам (порядок — первый приход)
const counts = new Map();
for (const r of data.recipes) counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
const expectedCategories = [...counts].map(([name, count]) => ({ name, count }));
if (JSON.stringify(expectedCategories) !== JSON.stringify(data.categories)) {
  errors.push('список категорий в JSON не совпадает с подсчётом по рецептам');
}

if (errors.length > 0) {
  console.error(`Валидация не пройдена:\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`OK: ${data.recipes.length} рецептов, ${data.categories.length} категорий — валидация пройдена`);
