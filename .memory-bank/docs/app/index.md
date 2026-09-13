---
file: .memory-bank/docs/app/index.md
description: "L2: контейнер «Веб-приложение» — данные, UI, навигация, деплой"
version: '0.1.0'
date: '2026-09-13'
status: 'ACTIVE'
c4_level: 'L2'
parent: '.memory-bank/docs/architecture.md'
---

# Веб-приложение (статический сайт рецептов)

> Контейнер C4-L2: статическое SPA без сборки. Здесь — навигация по коду и правилам.

## Данные

- Источник правды — `receps.csv` (RFC4180: кавычки обязательны для названий с запятыми)
- Генерация: `npm run build:data` → `data/recipes.json` (`{total, categories, recipes}`)
- Валидация: `npm run validate` — объём/поля/https/дубли/категории; запускать после
  каждого изменения CSV
- Парсер: `scripts/lib/csv.mjs` — общий для build и validate (SSOT парсинга)

## UI

- `index.html` — семантический каркас; секции: шапка → фильтры (липкие) → счётчик →
  сетка карточек → подвал
- `css/styles.css` — дизайн-токены в `:root`; сетка `auto-fill minmax(230px, 1fr)`
  (адаптив без медиазапросов); тёмная тема — только переопределение переменных
  через `prefers-color-scheme`
- `js/app.js` — состояние `{recipes, categories, activeCategory, query}`;
  фильтрация = категория AND поиск; поиск с debounce 200 мс и нормализацией ё/е;
  пустые состояния и экран ошибки загрузки — обязательны

## Проверки

- `node --check js/app.js` — синтаксис (gates: typecheck)
- `node scripts/dev-check.mjs` — поднимает одноразовый сервер и проверяет отдачу и
  содержимое страницы/CSS/JS/JSON (13 проверок)

## Деплой

- `.github/workflows/deploy.yml`: push в `main` → validate → сборка `public/` из
  whitelist (index.html, css/, js/, data/, README.md, .nojekyll) → deploy-pages
- Публикуются только файлы из whitelist: служебные папки (`.memory-bank/`,
  `.protocols/`, `scripts/`, `receps.csv`) на сайт не попадают
- Один раз вручную: Settings → Pages → Source: GitHub Actions
- Сайт живёт в подпуте `/recipes/` — в коде только относительные пути
  (`./css/...`, `./data/...`), никаких ведущих слэшей
