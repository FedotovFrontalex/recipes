# Protocol status: 0001 — Веб-приложение рецептов (GitHub Pages)

- **Current Step:** 2
- **Status:** In Progress
- **Last Action Summary:** "Шаг 1 готов: receps.csv → data/recipes.json (290 рецептов, 11 категорий), валидатор зелёный"
- **Next Action:** "Приступить к шагу 2 (см. 02-ui.md): каркас index.html, styles.css, app.js, рендер карточек"

## Git
- **Branch:** 0001-recipes-web-app (запушена в origin)
- **PR:** нет (gh CLI отсутствует)
- **Last commit:** feat(data): generate recipes.json from csv [protocol-0001/01]

## Paths
- **PROJECT_ROOT:** C:\Users\Алексей\Desktop\coocking
- **CWD (worktree):** C:\Users\Алексей\Desktop\coocking\.worktrees\0001-recipes-web-app
- **Protocol folder:** C:\Users\Алексей\Desktop\coocking\.worktrees\0001-recipes-web-app\.protocols\0001-recipes-web-app

## Reference Materials (актуальные для текущего шага)
- `data/recipes.json`: `{ total: 290, categories: [{name, count}×11], recipes: [{name, category, url}×290] }`
- `js/app.js` ещё не существует — создать на шаге 2; подключать с `defer`
- Только относительные пути (`./data/recipes.json`) — сайт живёт в подпути Pages
- Локальная проверка UI: `npx --yes serve .` (fetch не работает с file://)
