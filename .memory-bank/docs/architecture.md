---
file: .memory-bank/docs/architecture.md
description: "L1: системная архитектура — контейнеры, технологии, потоки данных"
version: '0.2.0'
date: '2026-09-13'
status: 'ACTIVE'
c4_level: 'L1'
parent: '.memory-bank/index.md'
---

# System Architecture

## Контейнеры

| Контейнер | Технологии | Ответственность | Документация |
|---|---|---|---|
| Веб-приложение | HTML + CSS + vanilla JS (без сборки) | UI: карточки рецептов, чипы категорий, поиск | docs/app/index.md |
| Генератор данных | Node.js ≥ 18 (scripts/, без зависимостей) | receps.csv (RFC4180) → data/recipes.json + валидация | docs/app/index.md |
| Деплой | GitHub Actions → GitHub Pages | Публикация статики из whitelist при push в main | README.md |

## Потоки данных (главные)

1. Сборка данных: `receps.csv` → `scripts/build-data.mjs` → `data/recipes.json`
   → `scripts/validate-data.mjs` (зелёный обязателен)
2. Пользователь → браузер → статика с GitHub Pages; `js/app.js` делает
   `fetch('./data/recipes.json')` и рендерит карточки (фильтрация — клиентская)

## Хранилища и инфраструктура

- БД/кэш/очереди: нет. Файлы: репозиторий (CSV — источник, JSON — артефакт).
- Деплой: Pages, сайт — <https://fedotovfrontalex.github.io/recipes/>; из подпута
  `/recipes/` — поэтому в коде только относительные пути.
- CI-гейт: `npm run validate` в deploy.yml гасит битые правки CSV до публикации.

## Ключевые архитектурные решения (ADR-индекс)

- 0001: статическое SPA без сборки и зависимостей; CSV → JSON node-скриптом;
  деплой через Actions с whitelist файлов — см. .protocols/0001-recipes-web-app/plan.md
