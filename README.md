# Рецепты

Веб-справочник рецептов: 290 блюд со ссылками на первоисточник
([ivlevchefbooks.ru](https://ivlevchefbooks.ru)). Поиск по названию, фильтр по
категориям, тёмная тема, адаптивная вёрстка от телефона до десктопа.

**Демо:** <https://fedotovfrontalex.github.io/recipes/>

## Как это устроено

- Статический сайт **без сборки и без зависимостей**: HTML + CSS + vanilla JS.
- Данные: `receps.csv` → `data/recipes.json` (генерируются node-скриптом).
- Деплой: GitHub Actions → GitHub Pages при каждом push в `main`.

## Структура репозитория

```
index.html            страница приложения
css/styles.css        стили (адаптив, тёмная тема)
js/app.js             логика: загрузка данных, чипы категорий, поиск
data/recipes.json     данные для сайта (генерируются, коммитятся)
receps.csv            исходные данные (источник правды)
scripts/              build-data, validate-data, dev-check (node, без зависимостей)
.github/workflows/    деплой на GitHub Pages
```

## Обновление рецептов

1. Добавьте строку в `receps.csv` в формате `Название,Категория,Ссылка`.
   Если в названии есть запятая — возьмите название в двойные кавычки:
   `"Пирог с курицей, сыром, томатами",Пироги и выпечка,https://...`
2. Перегенерируйте данные и проверьте их:
   ```
   npm run build:data
   npm run validate
   ```
3. Закоммитьте и запушьте в `main` — сайт обновится автоматически.

## Локальный запуск

```
npm run build:data
npx --yes serve .
```

Откройте показанный URL (fetch не работает с `file://`, нужен http-сервер).
Автопроверка без браузера: `node scripts/dev-check.mjs`.

## Настройка GitHub Pages

Один раз: в репозитории открыть **Settings → Pages → Build and deployment →
Source: GitHub Actions**. Дальше workflow `deploy.yml` всё делает сам при push в `main`.
