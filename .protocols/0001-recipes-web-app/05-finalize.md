# Шаг 05: Финализация — документация и отчёт

## Briefing
- **Цель:** Memory Bank отражает новое приложение (SSOT); протокол готов к `/flow-review`.
- **Ключевые файлы:**
  - `.memory-bank/docs/product.md`, `architecture.md`, `structure.md` (изменить)
  - `.memory-bank/docs/app/index.md` (создать — L2-контейнер «Веб-приложение»)
  - `.memory-bank/index.md` (изменить: заполнить секцию L2/L3 ссылкой на контейнер)
  - `.memory-bank/learnings/anti-patterns.md` (изменить — если есть уроки)
- **Additional info:** правила MBB — `.memory-bank/mbb/principles.md` и
  `file-standards.md`: SSOT, аннотированные ссылки, duo-файлы, C4-уровни. Не
  дублировать содержимое между файлами — ссылаться. Frontmatter (description,
  version, status) — как в существующих документах.

## Sub-tasks
1. **product.md:** продукт = веб-справочник рецептов на GitHub Pages; сценарии:
   найти рецепт поиском, смотреть по категориям, открыть источник.
2. **architecture.md:** контейнер «Статическое SPA»: браузер + vanilla JS, данные
   `data/recipes.json` (генерируются из `receps.csv`), деплой GitHub Actions → Pages.
3. **structure.md:** раскладка корня (`index.html`, `css/`, `js/`, `data/`,
   `scripts/`, `.github/workflows/`).
4. **docs/app/index.md:** навигация по контейнеру: данные (шаг 01), UI (02),
   навигация (03), деплой (04) — с аннотированными ссылками на файлы.
5. **index.md (корень MBB):** секция L2/L3 — ссылка на `docs/app/index.md` с аннотацией.
6. **learnings:** записать уроки (например: CSV с кавычками → обязателен RFC4180-парсер;
   относительные пути для Pages-подпути).
7. **Финальный коммит** `docs(memory-bank): document recipes app [protocol-0001/05]`, отчёт.

## Acceptance criteria (шаг считается готовым, когда)
- Документация консистентна: индексы ссылаются на живые файлы, дублирования нет.
- `context.md` переведён в `Ready for review`.
- Все проверки из `.flow/gates.md` зелёные.
- Протокол готов к `/flow-review 0001`.
