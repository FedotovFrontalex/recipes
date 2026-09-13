/**
 * Рендер карточек рецептов из data/recipes.json.
 * Загрузка данных — по относительному пути: сайт живёт в подпути GitHub Pages.
 */

/** Состояние приложения: загруженные данные. */
const state = {
  /** @type {{name: string, category: string, url: string}[]} */
  recipes: [],
  /** @type {{name: string, count: number}[]} */
  categories: [],
};

const grid = document.getElementById('grid');
const counter = document.getElementById('counter');

/**
 * Загружает рецепты из JSON-файла.
 * @throws {Error} если ответ не OK
 */
async function loadRecipes() {
  const response = await fetch('./data/recipes.json');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Создаёт DOM-карточку рецепта (вся карточка — ссылка на источник).
 * @param {{name: string, category: string, url: string}} recipe
 * @returns {HTMLElement}
 */
function createCard(recipe) {
  const card = document.createElement('article');
  card.className = 'card';

  const link = document.createElement('a');
  link.className = 'card__link';
  link.href = recipe.url;
  link.target = '_blank';
  link.rel = 'noopener';

  const badge = document.createElement('span');
  badge.className = 'card__badge';
  badge.textContent = recipe.category;

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = recipe.name;

  const cta = document.createElement('span');
  cta.className = 'card__cta';
  cta.textContent = 'Открыть рецепт →';

  link.append(badge, title, cta);
  card.append(link);
  return card;
}

/**
 * Рисует список карточек и счётчик.
 * @param {{name: string, category: string, url: string}[]} list
 */
function renderCards(list) {
  grid.replaceChildren(...list.map(createCard));
  counter.textContent = `Всего рецептов: ${list.length}`;
}

/** Рисует сообщение об ошибке загрузки с кнопкой «Повторить». */
function renderError() {
  grid.replaceChildren();

  const box = document.createElement('div');
  box.className = 'error';

  const message = document.createElement('p');
  message.textContent = 'Не удалось загрузить рецепты. Проверьте подключение к сети.';

  const retry = document.createElement('button');
  retry.type = 'button';
  retry.textContent = 'Повторить';
  retry.addEventListener('click', init);

  box.append(message, retry);
  grid.append(box);
  counter.textContent = '';
}

async function init() {
  try {
    const data = await loadRecipes();
    state.recipes = data.recipes;
    state.categories = data.categories;
    renderCards(state.recipes);
  } catch (error) {
    console.error('Не удалось загрузить данные:', error);
    renderError();
  }
}

init();
