(() => {
  'use strict';

  /* =========================
     Data
  ========================= */

  const RECIPES = [
    {
      id: 'r1',
      title: 'Paneer Tikka Wrap',
      description: 'Smoky paneer with onions and mint chutney in a warm wrap.',
      timeMins: 20,
      difficulty: 'easy',
      tags: ['vegetarian', 'quick'],
      ingredients: ['Paneer', 'Onion', 'Capsicum', 'Yogurt', 'Spices', 'Wrap/roti', 'Mint chutney'],
      steps: [
        'Mix yogurt + spices, coat paneer and veggies.',
        'Pan-sear till charred.',
        'Assemble in wrap with chutney.',
      ],
    },
    {
      id: 'r2',
      title: 'Vegan Peanut Noodles',
      description: 'Creamy peanut sauce noodles with crunchy veggies.',
      timeMins: 15,
      difficulty: 'easy',
      tags: ['vegan', 'quick'],
      ingredients: ['Noodles', 'Peanut butter', 'Soy sauce', 'Lime', 'Garlic', 'Carrot', 'Cucumber'],
      steps: [
        'Whisk peanut butter + soy + lime + garlic + water.',
        'Toss with cooked noodles and veggies.',
        'Top with sesame seeds.',
      ],
    },
    {
      id: 'r3',
      title: 'Masala Omelette',
      description: 'Fluffy eggs with green chilli, onion, and coriander.',
      timeMins: 10,
      difficulty: 'easy',
      tags: ['quick'],
      ingredients: ['Eggs', 'Onion', 'Green chilli', 'Coriander', 'Salt', 'Pepper', 'Butter/oil'],
      steps: ['Beat eggs with chopped veggies.', 'Cook on medium heat until set.', 'Fold and serve hot.'],
    },
    {
      id: 'r4',
      title: 'Chole Bowl',
      description: 'Hearty chickpeas in a spiced gravy—perfect with rice or salad.',
      timeMins: 45,
      difficulty: 'medium',
      tags: ['vegan', 'vegetarian'],
      ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Ginger-garlic', 'Chole masala', 'Cumin', 'Salt'],
      steps: [
        'Pressure cook chickpeas (or use canned).',
        'Sauté onion + ginger-garlic, add tomato + spices.',
        'Simmer chickpeas in masala until thick.',
      ],
    },
    {
      id: 'r5',
      title: 'Grilled Cheese Upgrade',
      description: 'Classic grilled cheese with garlic butter and oregano.',
      timeMins: 12,
      difficulty: 'easy',
      tags: ['vegetarian', 'quick'],
      ingredients: ['Bread', 'Cheese', 'Butter', 'Garlic', 'Oregano', 'Chilli flakes (optional)'],
      steps: [
        'Mix butter with grated garlic + oregano.',
        'Spread on bread, add cheese, grill until golden.',
      ],
    },
    {
      id: 'r6',
      title: 'Veggie Fried Rice',
      description: 'One-pan fried rice with soy, veggies, and a clean finish.',
      timeMins: 25,
      difficulty: 'medium',
      tags: ['vegetarian'],
      ingredients: ['Cooked rice', 'Soy sauce', 'Carrot', 'Beans', 'Capsicum', 'Spring onion', 'Pepper'],
      steps: [
        'Stir-fry veggies on high heat.',
        'Add rice + soy, toss quickly.',
        ['Finish', ['Taste and adjust salt', 'Add spring onion', 'Serve hot']],
      ],
    },
    {
      id: 'r7',
      title: 'Vegan Dal Soup',
      description: 'Comforting lentil soup with cumin and lemon.',
      timeMins: 35,
      difficulty: 'medium',
      tags: ['vegan', 'vegetarian'],
      ingredients: ['Moong dal', 'Cumin', 'Turmeric', 'Garlic', 'Lemon', 'Salt', 'Water'],
      steps: [
        'Rinse and boil dal with turmeric.',
        ['Tadka', ['Sauté garlic + cumin', 'Pour over dal']],
        'Finish with lemon.',
      ],
    },
    {
      id: 'r8',
      title: 'Chocolate Mug Cake',
      description: 'Fast dessert in a mug—soft, chocolatey, and dangerous.',
      timeMins: 5,
      difficulty: 'easy',
      tags: ['vegetarian', 'quick'],
      ingredients: ['Flour', 'Cocoa', 'Sugar', 'Milk', 'Oil', 'Baking powder', 'Chocolate chips (optional)'],
      steps: [
        'Mix dry ingredients in mug.',
        'Add milk + oil, mix smooth.',
        'Microwave 60–90 seconds (watch it!).',
      ],
    },
  ];

  /* =========================
     State
  ========================= */

  const state = {
    activeFilter: 'all',
    activeSort: 'title-asc',
    searchQuery: '',
    favorites: [], // array of recipe IDs
  };

  const FAVORITES_KEY = 'recipeFavorites';

  /* =========================
     DOM references
  ========================= */

  const recipesContainer = document.querySelector('#recipes');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortSelect = document.querySelector('#sort-select');
  const counterEl = document.querySelector('#recipe-counter');

  const searchInput = document.querySelector('#search-input');
  const clearSearchBtn = document.querySelector('#clear-search');

  /* =========================
     Helpers: localStorage
  ========================= */

  const loadFavorites = () => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  };

  const isFavorited = (recipeId) => state.favorites.includes(recipeId);

  const toggleFavorite = (recipeId) => {
    state.favorites = isFavorited(recipeId)
      ? state.favorites.filter((id) => id !== recipeId)
      : [...state.favorites, recipeId];

    saveFavorites(state.favorites);
    updateDisplay();
  };

  /* =========================
     Filter functions
  ========================= */

  const applySearch = (recipes, query) => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return recipes;

    return recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);

      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(lowerQuery)
      );

      const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);

      return titleMatch || ingredientMatch || descriptionMatch;
    });
  };

  const applyFilter = (recipes, filterType) => {
    switch (filterType) {
      case 'vegetarian':
      case 'vegan':
      case 'quick':
        return recipes.filter((r) => r.tags.includes(filterType));
      case 'favorites':
        return recipes.filter((r) => isFavorited(r.id));
      case 'all':
      default:
        return recipes;
    }
  };

  /* =========================
     Sort functions
  ========================= */

  const difficultyRank = (d) => {
    const map = { easy: 1, medium: 2, hard: 3 };
    return map[d] ?? 999;
  };

  const applySort = (recipes, sortType) => {
    const copy = [...recipes];

    switch (sortType) {
      case 'time-asc':
        return copy.sort((a, b) => a.timeMins - b.timeMins);
      case 'difficulty-asc':
        return copy.sort((a, b) => difficultyRank(a.difficulty) - difficultyRank(b.difficulty));
      case 'title-asc':
      default:
        return copy.sort((a, b) => a.title.localeCompare(b.title));
    }
  };

  /* =========================
     UI: counter
  ========================= */

  const updateCounter = (visibleCount, totalCount) => {
    counterEl.textContent = `Showing ${visibleCount} of ${totalCount} recipes`;
  };

  /* =========================
     UI: recursion for nested steps
  ========================= */

  const renderStepsRecursive = (steps) => {
    // steps can contain strings or nested arrays like:
    // ['Finish', ['Do A', 'Do B']]
    const ul = document.createElement('ul');
    ul.className = 'list';

    steps.forEach((step) => {
      const li = document.createElement('li');

      if (Array.isArray(step)) {
        // first element is heading, second is nested steps
        const [title, nested] = step;
        li.textContent = String(title);

        if (Array.isArray(nested)) {
          const nestedWrap = document.createElement('div');
          nestedWrap.className = 'nested';
          nestedWrap.appendChild(renderStepsRecursive(nested));
          li.appendChild(nestedWrap);
        }
      } else {
        li.textContent = String(step);
      }

      ul.appendChild(li);
    });

    return ul;
  };

  /* =========================
     UI: card creation
  ========================= */

  const createTagPill = (text) => `<span class="tag">${text}</span>`;

  const createRecipeCard = (recipe) => {
    const favorited = isFavorited(recipe.id);

    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.recipeId = recipe.id;

    card.innerHTML = `
      <div class="card-top">
        <div>
          <h3>${recipe.title}</h3>
        </div>
        <button
          class="favorite-btn ${favorited ? 'favorited' : ''}"
          type="button"
          data-action="toggle-favorite"
          data-recipe-id="${recipe.id}"
          aria-label="Toggle favorite"
          title="Toggle favorite"
        >
          ${favorited ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="meta">
        ⏱ ${recipe.timeMins} mins • 🎯 ${recipe.difficulty}
      </div>

      <div class="tags">
        ${recipe.tags.map(createTagPill).join('')}
      </div>

      <p class="desc">${recipe.description}</p>

      <div class="card-actions">
        <button class="toggle-btn" type="button" data-action="toggle-ingredients">
          Toggle Ingredients
        </button>
        <button class="toggle-btn" type="button" data-action="toggle-steps">
          Toggle Steps
        </button>
      </div>

      <div class="section hidden" data-section="ingredients">
        <p class="section-title">Ingredients</p>
        <ul class="list">
          ${recipe.ingredients.map((i) => `<li>${i}</li>`).join('')}
        </ul>
      </div>

      <div class="section hidden" data-section="steps">
        <p class="section-title">Steps</p>
        <div data-steps-root="true"></div>
      </div>
    `;

    // Inject recursive steps (cleaner than string-building nested HTML)
    const stepsRoot = card.querySelector('[data-steps-root="true"]');
    stepsRoot.appendChild(renderStepsRecursive(recipe.steps));

    return card;
  };

  const renderRecipes = (recipes) => {
    recipesContainer.innerHTML = '';

    if (recipes.length === 0) {
      recipesContainer.innerHTML = `<div class="empty">No recipes match your search/filter.</div>`;
      return;
    }

    const frag = document.createDocumentFragment();
    recipes.forEach((r) => frag.appendChild(createRecipeCard(r)));
    recipesContainer.appendChild(frag);
  };

  /* =========================
     Main pipeline (Search → Filter → Sort → Counter → Render)
  ========================= */

  const updateDisplay = () => {
    const total = RECIPES.length;

    const searched = applySearch(RECIPES, state.searchQuery);
    const filtered = applyFilter(searched, state.activeFilter);
    const sorted = applySort(filtered, state.activeSort);

    updateCounter(sorted.length, total);
    renderRecipes(sorted);
  };

  /* =========================
     Event handlers
  ========================= */

  const setActiveFilterButton = (filterValue) => {
    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.filter === filterValue);
    });
  };

  const handleFilterClick = (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    state.activeFilter = btn.dataset.filter;
    setActiveFilterButton(state.activeFilter);
    updateDisplay();
  };

  const handleSortChange = (e) => {
    state.activeSort = e.target.value;
    updateDisplay();
  };

  // Debounce timer prevents search from running on EVERY keystroke
  let debounceTimer = null;

  const handleSearchInput = (e) => {
    const value = e.target.value;

    // show/hide clear button immediately
    clearSearchBtn.classList.toggle('hidden', value.length === 0);

    // debounced update
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchQuery = value;
      updateDisplay();
    }, 300);
  };

  const clearSearch = () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    updateDisplay();
  };

  const handleCardActions = (e) => {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;

    const action = actionEl.dataset.action;
    const card = e.target.closest('.card');
    if (!card) return;

    if (action === 'toggle-ingredients' || action === 'toggle-steps') {
      const sectionName = action === 'toggle-ingredients' ? 'ingredients' : 'steps';
      const section = card.querySelector(`[data-section="${sectionName}"]`);
      if (section) section.classList.toggle('hidden');
      return;
    }

    if (action === 'toggle-favorite') {
      const recipeId = actionEl.dataset.recipeId;
      if (recipeId) toggleFavorite(recipeId);
    }
  };

  /* =========================
     Setup
  ========================= */

  const setupEventListeners = () => {
    document.querySelector('.filters').addEventListener('click', handleFilterClick);
    sortSelect.addEventListener('change', handleSortChange);

    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', clearSearch);

    // Event delegation for all cards (toggles + favorites)
    recipesContainer.addEventListener('click', handleCardActions);
  };

  const init = () => {
    console.log('[RecipeJS] Initializing...');
    state.favorites = loadFavorites();
    console.log('[RecipeJS] Favorites loaded:', state.favorites);

    setupEventListeners();
    updateDisplay();

    consol
