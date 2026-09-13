# Шаг 01: Данные — CSV → JSON

## Briefing
- **Цель:** воспроизводимая генерация `data/recipes.json` из `receps.csv` + валидатор данных.
- **Ключевые файлы:**
  - `package.json` (создать: scripts, `type: module`, без зависимостей)
  - `scripts/build-data.mjs` (создать)
  - `scripts/validate-data.mjs` (создать)
  - `data/recipes.json` (сгенерировать, коммитить)
- **Additional info:**
  - Парсер CSV — ручной, RFC4180: двойные кавычки (внутри — `""` как литерал), запятые
    внутри кавычек, CRLF, пустые строки, возможный BOM (срезать `\uFEFF`).
    Строк с кавычками в файле 7 — все в колонке «Название».
  - Структура JSON: `{ "categories": [{ "name": "...", "count": N }], "recipes":
    [{ "name": "...", "category": "...", "url": "..." }] }`. Категории — по первому
    появлению; рецепты — в исходном порядке файла.
  - URL в файле — `https://ivlevchefbooks.ru/...`. Заголовок CSV (`Название,Категория,Ссылка`)
    при парсинге пропустить.
  - Ошибка парсинга/структуры → ненулевой exit code с понятным сообщением (строка/причина).

## Sub-tasks
1. **package.json:** `name: recipes`, `private: true`, `type: module`,
   scripts: `build:data` → `node scripts/build-data.mjs`, `validate` → `node scripts/validate-data.mjs`.
2. **build-data.mjs:** прочитать `receps.csv`, распарсить (RFC4180), смаппить в
   `{name, category, url}`, собрать категории со счётчиками, записать
   `data/recipes.json` (UTF-8, отступ 2, перевод строки в конце).
3. **validate-data.mjs:** прочитать JSON и CSV; проверить: рецепты ≥ 280; все поля
   непустые; `url` начинается с `https://`; нет дублей `url`; название не содержит
   кавычек-артефактов; список категорий в JSON совпадает с подсчётом из CSV.
   Любое нарушение — список ошибок в stderr и `process.exit(1)`.
4. **Запуск:** `npm run build:data && npm run validate` — убедиться в зелёном результате.
5. **Документация:** N/A (документация — шаг 5).

## Acceptance criteria (шаг считается готовым, когда)
- `data/recipes.json` содержит все рецепты, включая 7 «запятых» названий полностью
  (например «Салат из булгура, перца, кабачков» — одним полем).
- `npm run validate` зелёный; `node --check scripts/*.mjs` зелёный.
- Коммит `feat(data): generate recipes.json from csv [protocol-0001/01]`.
