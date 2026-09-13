# Work Log: 0001 — Веб-приложение рецептов (GitHub Pages)

Записи только добавляются. Формат каждой записи:

---
### Шаг 00 — 2026-09-13
- **Сделано:** инициализирован репозиторий (ветка main, первичный коммит фреймворка и
  данных), заполнен `.flow/gates.md` (typecheck/test/build через node, без зависимостей),
  создан worktree `.worktrees/0001-recipes-web-app`, написаны артефакты протокола
  (plan.md, шаги 00–05, context.md, log.md), добавлен remote
  `git@github.com:FedotovFrontalex/recipes.git`.
- **Почему так:** статическое SPA без сборки — минимальная сложность для справочника
  из ~290 ссылок и GitHub Pages. Worktree внутри репо (`.worktrees/`) — терминал агента
  ограничен корнем проекта. Git-идентичность задана локально:
  `FedotovFrontalex <FedotovFrontalex@users.noreply.github.com>` (пользователь может
  сменить). PR не создаётся — нет `gh` CLI.
- **Проблемы и решения:** git не знал автора (задали локальный config); SSH
  `Permission denied (publickey)` — ключа нет, на шаге 00 сгенерируем ed25519 и
  отдаём пользователю публичный ключ для github.com/settings/keys; CSV содержит
  кавычки с запятыми внутри — в шаге 01 нужен RFC4180-парсер.
- **Commit:** feat(protocol): add plan for 0001-recipes-web-app [protocol-0001/00]

---
### Шаг 01 — 2026-09-13
- **Сделано:** `package.json` (без зависимостей, `type: module`), `scripts/lib/csv.mjs`
  (RFC4180-парсер), `scripts/build-data.mjs` (CSV → `data/recipes.json`: `{total,
  categories, recipes}`; категории по первому появлению со счётчиками),
  `scripts/validate-data.mjs` (объём ≥ 280 и сверка с CSV, непустые поля, https-URL,
  без дублей ссылок, без кавычек-артефактов, категории сходятся с подсчётом).
  Итог: 290 рецептов, 11 категорий.
- **Почему так:** парсер вынесен в `lib/`, чтобы build и validate работали с одним и
  тем же разбором (SSOT для парсинга); `data/recipes.json` коммитится — сайт на Pages
  не выполняет сборку, данные готовы к отдаче статики. Проверка «7 названий с
  запятыми» — grep по «булгура, перца» ✓.
- **Проблемы и решения:** инструмент записи файлов дважды спотыкался о свежесозданные
  папки (`.protocols/…`, `scripts/lib/`) — помогло повторение записи после создания
  каталога; на результаты шага не повлияло.
- **Commit:** feat(data): generate recipes.json from csv [protocol-0001/01]
