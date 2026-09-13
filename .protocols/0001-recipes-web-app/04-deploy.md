# Шаг 04: Деплой на GitHub Pages

## Briefing
- **Цель:** автоматический деплой в GitHub Pages при push в `main`.
- **Ключевые файлы:**
  - `.github/workflows/deploy.yml` (создать)
  - `.nojekyll` (создать, пустой)
  - `README.md` (создать)
- **Additional info:**
  - Workflow по официальному шаблону `actions/deploy-pages`:
    - `on`: `push` → `main`, `workflow_dispatch`;
    - `permissions`: `contents: read`, `pages: write`, `id-token: write`;
    - `concurrency`: группа `pages`, `cancel-in-progress: true`;
    - job `build`: checkout → `upload-pages-artifact` с **белым списком путей**
      (`index.html`, `css/`, `js/`, `data/`, `README.md`, `.nojekyll`) — чтобы
      `.memory-bank/`, `.protocols/` и служебное не публиковались;
    - job `deploy`: `configure-pages` → `deploy-pages`, `environment: github-pages`.
  - Пользователь один раз включает: Settings → Pages → Source: **GitHub Actions**.
  - Проверить grep'ом, что в `index.html`/`js`/`css` нет путей с ведущим `/`.
  - README: что за сайт, демо-URL (`https://fedotovfrontalex.github.io/recipes/`),
    структура репозитория, «как добавить рецепт» (строка в CSV → `npm run build:data`
    → `npm run validate` → commit → push), как включён Pages.

## Sub-tasks
1. **deploy.yml** по шаблону выше (у `upload-pages-artifact` перечислить пути в `path`).
2. **.nojekyll** в корне.
3. **README.md** с разделами: О проекте, Демо, Структура, Обновление рецептов, Деплой.
4. **Проверка путей:** `grep -rn "'/" js/ css/ index.html` и `grep -rn '"/' ...` —
   пусто; URLs рецептов (внешние) не считать.

## Acceptance criteria (шаг считается готовым, когда)
- Workflow синтаксически валиден (YAML), пути в artifact — белый список.
- README описывает полный цикл добавления рецепта и включения Pages.
- `node --check js/app.js` зелёный.
- Коммит `ci(deploy): github pages workflow [protocol-0001/04]`.
- Пуш в `origin` выполнен (если SSH уже подключён) — иначе сразу после подключения.
