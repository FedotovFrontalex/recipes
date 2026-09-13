/**
 * Рендер карточек рецептов из data/recipes.json: чипы категорий, поиск,
 * комбинированная фильтрация, пустые состояния.
 * Загрузка данных — по относительному пути: сайт живёт в подпути GitHub Pages.
 */

const ALL = 'Все';

/** Состояние приложения: данные и активные фильтры. */
const state = {
  /** @type {{name: string, category: string, url: string}[]} */
  recipes: [],
  /** @type {{name: string, count: number}[]} */
  categories: [],
  /** Активная категория или ALL. */
  activeCategory: ALL,
  /** Текущий поисковый запрос. */
  query: '',
};

const grid = document.getElementById('grid');
const counter = document.getElementById('counter');
const chips = document.getElementById('chips');
const searchInput = document.getElementById('search');
const searchClear = document.getElementById('search-clear');

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
 * Нормализует строку для поиска: регистр и ё/е.
 * @param {string} text
 * @returns {string}
 */
function normalize(text) {
  return text.toLowerCase().replaceAll('ё', 'е');
}

/**
 * Фильтрует рецепты по активной категории и поисковому запросу (AND).
 * @returns {{name: string, category: string, url: string}[]}
 */
function filteredRecipes() {
  const query = normalize(state.query.trim());
  return state.recipes.filter((recipe) => {
    const byCategory = state.activeCategory === ALL || recipe.category === state.activeCategory;
    const byQuery = !query || normalize(recipe.name).includes(query);
    return byCategory && byQuery;
  });
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
 * Рисует список карточек и счётчик; при пустом результате — пустое состояние.
 * @param {{name: string, category: string, url: string}[]} list
 */
function renderCards(list) {
  if (list.length === 0) {
    renderEmpty();
    counter.textContent = 'Найдено: 0';
    return;
  }

  grid.replaceChildren(...list.map(createCard));
  counter.textContent = `Найдено: ${list.length}`;
}

/** Рисует пустое состояние с кнопкой сброса фильтров. */
function renderEmpty() {
  const box = document.createElement('div');
  box.className = 'empty';

  const message = document.createElement('p');
  message.textContent = state.query.trim()
    ? `Ничего не найдено по запросу «${state.query.trim()}»`
    : 'В этой категории пока нет рецептов';

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.textContent = 'Сбросить фильтры';
  reset.addEventListener('click', resetFilters);

  box.append(message, reset);
  grid.replaceChildren(box);
}

/** Рендерит чипы категорий со счётчиками («Все» — первым). */
function renderChips() {
  const items = [{ name: ALL, count: state.recipes.length }, ...state.categories];

  const buttons = items.map(({ name, count }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.dataset.category = name;
    button.setAttribute('aria-pressed', String(name === state.activeCategory));
    button.textContent = `${name} (${count})`;
    button.addEventListener('click', () => {
      state.activeCategory = name;
      syncChipStates();
      applyFilters();
    });
    return button;
  });

  chips.replaceChildren(...buttons);
}

/** Синхронизирует aria-pressed чипов с активной категорией. */
function syncChipStates() {
  for (const button of chips.children) {
    button.setAttribute('aria-pressed', String(button.dataset.category === state.activeCategory));
  }
}

/** Применяет фильтры и перерисовывает список. */
function applyFilters() {
  renderCards(filteredRecipes());
  searchClear.hidden = state.query === '';
}

/** Сбрасывает категорию и поиск. */
function resetFilters() {
  state.activeCategory = ALL;
  state.query = '';
  searchInput.value = '';
  syncChipStates();
  applyFilters();
  searchInput.focus();
}

let debounceTimer;

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.query = searchInput.value;
    applyFilters();
  }, 200);
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  state.query = '';
  applyFilters();
  searchInput.focus();
});

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
    renderChips();
    applyFilters();
  } catch (error) {
    console.error('Не удалось загрузить данные:', error);
    renderError();
  }
}

init();
