---
file: .memory-bank/docs/structure.md
description: "L1: раскладка директорий проекта — где что искать в коде"
version: '0.2.0'
date: '2026-09-13'
status: 'ACTIVE'
c4_level: 'L1'
parent: '.memory-bank/index.md'
---

# Project Structure

> Агент использует этот файл как карту навигации по коду. Обновлять при изменении раскладки.

```
project/
├── index.html            # страница приложения
├── css/styles.css        # стили: дизайн-токены, адаптивная сетка, тёмная тема
├── js/app.js             # логика: загрузка данных, чипы категорий, поиск
├── data/recipes.json     # данные для сайта (генерируются, коммитятся)
├── receps.csv            # исходные данные — источник правды
├── scripts/              # node-скрипты без зависимостей (type: module)
│   ├── lib/csv.mjs       # RFC4180-парсер (общий для build и validate)
│   ├── build-data.mjs    # CSV → data/recipes.json (npm run build:data)
│   ├── validate-data.mjs # валидация данных (npm run validate)
│   └── dev-check.mjs     # автопроверка сайта без браузера (13 проверок)
├── public/               # НЕ в репозитории: собирается workflow при деплое
├── .github/workflows/    # deploy.yml — GitHub Pages
├── .memory-bank/         # база знаний (этот фреймворк)
├── .protocols/           # протоколы доработок (план + шаги + лог + состояние)
├── .worktrees/           # worktree протоколов (игнорируется git)
├── .flow/                # машинерия FlowForge: gates.md, templates/
└── .zcode/               # адаптеры команд ZCode
```

## Правила размещения нового кода

- Новый UI-код — `js/` (vanilla JS, один файл, пока не разросся); стили — `css/`
- Новые node-скрипты — `scripts/`, общие функции — `scripts/lib/`
- Данные руками не править: `data/recipes.json` только генерируется из `receps.csv`
- Тесты: валидация данных — `scripts/validate-data.mjs`, сайт — `scripts/dev-check.mjs`;
  при росте логики выделять отдельные проверяемые модули в `scripts/lib/`

## Конвенции

- Язык/стек: vanilla JS (ES-модули, `type: module`), CSS с переменными; без сборки
- Форматтер/линтер: не настроены (см. .flow/gates.md — lint N/A); JSDoc обязателен
- Менеджер пакетов: npm без зависимостей (только scripts)
- Именование: классы по БЭМ-подобной схеме `block__element`, файлы — kebab-case
- Комментарии и UI — на русском
