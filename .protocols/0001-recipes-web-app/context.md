# Protocol status: 0001 — Веб-приложение рецептов (GitHub Pages)

- **Current Step:** 4
- **Status:** In Progress
- **Last Action Summary:** "Шаг 3 готов: чипы категорий, поиск с debounce и ё/е, пустое состояние, тёмная тема; dev-check 13/13"
- **Next Action:** "Приступить к шагу 4 (см. 04-deploy.md): GitHub Actions workflow, .nojekyll, README"

## Git
- **Branch:** 0001-recipes-web-app (запушена в origin)
- **PR:** нет (gh CLI отсутствует)
- **Last commit:** feat(nav): category chips and search [protocol-0001/03]

## Paths
- **PROJECT_ROOT:** C:\Users\Алексей\Desktop\coocking
- **CWD (worktree):** C:\Users\Алексей\Desktop\coocking\.worktrees\0001-recipes-web-app
- **Protocol folder:** C:\Users\Алексей\Desktop\coocking\.worktrees\0001-recipes-web-app\.protocols\0001-recipes-web-app

## Reference Materials (актуальные для текущего шага)
- Репозиторий: git@github.com:FedotovFrontalex/recipes.git; сайт будет на
  https://fedotovfrontalex.github.io/recipes/
- Пользователь должен один раз включить: Settings → Pages → Source: GitHub Actions
- В artifact whitelist: index.html, css/, js/, data/, README.md, .nojekyll
- Проверка шага: `node --check js/app.js && node scripts/dev-check.mjs` + grep на
  пути с ведущим `/` (внешние ссылки рецептов не считать)
