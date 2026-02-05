/* RecipeJS - Part 3: IIFE + Recursion + Expandable Cards */
const RecipeApp = (() => {
  console.log("RecipeApp initializing...");

  // ---------------------------
  // DATA
  // ---------------------------
  const recipes = [
    {
      id: "r1",
      title: "Garlic Butter Pasta",
      difficulty: "easy",
      cookTime: 15,
      description: "Fast comfort pasta with garlic, butter, and a squeeze of lemon.",
      ingredients: [
        "200g pasta",
        "2 tbsp butter",
        "4 cloves garlic (minced)",
        "Salt",
        "Black pepper",
        "Chili flakes (optional)",
        "1 tbsp lemon juice",
        "Parsley (optional)"
      ],
      steps: [
        "Boil salted water and cook pasta until al dente.",
        "Reserve 1/2 cup pasta water, then drain pasta.",
        "Melt butter in a pan on low heat.",
        "Add garlic and sauté 30–45 seconds (don’t brown).",
        "Add pasta + a splash of pasta water and toss.",
        "Season with salt, pepper, chili flakes.",
        "Finish with lemon juice and parsley. Serve hot."
      ]
    },
    {
      id: "r2",
      title: "Classic Omelette",
      difficulty: "easy",
      cookTime: 10,
      description: "Soft, fluffy omelette that you can customize with fillings.",
      ingredients: [
        "2–3 eggs",
        "1 tbsp milk/water (optional)",
        "Salt",
        "Black pepper",
        "1 tsp butter/oil",
        "Cheese (optional)",
        "Chopped onions/tomatoes (optional)"
      ],
      steps: [
        "Crack eggs into a bowl and whisk well.",
        "Add salt, pepper, and milk/water if using.",
        "Heat pan on medium-low and melt butter.",
        "Pour eggs and gently stir edges as they set.",
        "Add fillings on one side if using.",
        "Fold omelette and cook 30–60 seconds.",
        "Slide onto plate and serve."
      ]
    },
    {
      id: "r3",
      title: "Veggie Stir-Fry Bowl",
      difficulty: "medium",
      cookTime: 25,
      description: "Crisp vegetables tossed in a quick soy-garlic sauce.",
      ingredients: [
        "1 cup mixed veggies (bell pepper, carrot, beans)",
        "1 tbsp oil",
        "2 cloves garlic (minced)",
        "1 tsp ginger (minced)",
        "2 tbsp soy sauce",
        "1 tsp vinegar/lemon",
        "1 tsp honey/sugar (optional)",
        "Sesame seeds (optional)"
      ],
      steps: [
        "Chop vegetables into similar sizes.",
        {
          text: "Make the sauce",
          substeps: [
            "Mix soy sauce + vinegar/lemon.",
            "Add honey/sugar if you want it less salty.",
            {
              text: "Optional add-ins",
              substeps: ["Add chili sauce", "Add sesame oil (a few drops)"]
            }
          ]
        },
        "Heat oil in a wok/pan on high.",
        "Add garlic and ginger for 15 seconds.",
        "Add veggies and stir-fry 4–6 minutes.",
        "Pour sauce, toss 1–2 minutes until glossy.",
        "Top with sesame seeds and serve."
      ]
    },
    {
      id: "r4",
      title: "Tomato Basil Soup",
      difficulty: "medium",
      cookTime: 35,
      description: "Smooth tomato soup with basil and a creamy finish.",
      ingredients: [
        "4 tomatoes (or 1 can crushed tomatoes)",
        "1 onion (chopped)",
        "2 cloves garlic (chopped)",
        "1 tbsp olive oil",
        "Salt",
        "Black pepper",
        "Basil leaves",
        "Cream/milk (optional)"
      ],
      steps: [
        "Heat oil and sauté onions until soft.",
        "Add garlic and cook 30 seconds.",
        "Add tomatoes and simmer 15–20 minutes.",
        "Blend until smooth (careful if hot).",
        "Return to pot, season with salt and pepper.",
        "Add basil and simmer 2 minutes.",
        "Stir in cream/milk if using, then serve."
      ]
    },
    {
      id: "r5",
      title: "Paneer Tikka (Quick Pan)",
      difficulty: "hard",
      cookTime: 30,
      description: "Spiced paneer cubes seared in a pan for a smoky bite.",
      ingredients: [
        "200g paneer (cubes)",
        "2 tbsp curd/yogurt",
        "1 tsp ginger-garlic paste",
        "1 tsp chili powder",
        "1/2 tsp turmeric",
        "1 tsp garam masala",
        "Salt",
        "1 tbsp oil",
        "Capsicum/onion (optional)"
      ],
      steps: [
        {
          text: "Marinate paneer",
          substeps: [
            "Mix yogurt + ginger-garlic paste.",
            "Add chili powder, turmeric, garam masala, salt.",
            "Coat paneer cubes and rest 10 minutes.",
            {
              text: "Optional veggies",
              substeps: ["Cube onion", "Cube capsicum", "Coat in same marinade"]
            }
          ]
        },
        "Heat a pan and add oil on medium-high.",
        "Place paneer cubes, sear 2–3 minutes per side.",
        "Add veggies (if using) and sauté until slightly charred.",
        "Taste and adjust salt/spice.",
        "Serve with lemon and mint chutney."
      ]
    },
    {
      id: "r6",
      title: "Banana Peanut Smoothie",
      difficulty: "easy",
      cookTime: 5,
      description: "Creamy smoothie with banana and peanut butter.",
      ingredients: [
        "1 banana",
        "1 tbsp peanut butter",
        "250ml milk (or milk alternative)",
        "1 tsp honey (optional)",
        "Ice cubes (optional)",
        "Cinnamon (optional)"
      ],
      steps: [
        "Add banana, peanut butter, and milk to blender.",
        "Add honey and ice if using.",
        "Blend until smooth.",
        "Taste and adjust sweetness.",
        "Serve cold (sprinkle cinnamon if you like)."
      ]
    },
    {
      id: "r7",
      title: "Lemon Herb Grilled Chicken",
      difficulty: "hard",
      cookTime: 45,
      description: "Juicy chicken with lemon, herbs, and charred edges.",
      ingredients: [
        "2 chicken breasts",
        "2 tbsp lemon juice",
        "1 tbsp olive oil",
        "2 cloves garlic (minced)",
        "Mixed herbs (oregano/thyme)",
        "Salt",
        "Black pepper",
        "Chili flakes (optional)"
      ],
      steps: [
        "Slice chicken slightly to even thickness.",
        "Mix lemon juice, oil, garlic, herbs, salt, pepper.",
        "Marinate chicken 20–30 minutes.",
        "Preheat grill/pan to medium-high.",
        "Cook chicken 5–7 minutes per side (until done).",
        "Rest 5 minutes, then slice and serve."
      ]
    },
    {
      id: "r8",
      title: "Chocolate Mug Cake",
      difficulty: "medium",
      cookTime: 8,
      description: "Quick microwave cake for instant chocolate cravings.",
      ingredients: [
        "4 tbsp flour",
        "2 tbsp cocoa powder",
        "3 tbsp sugar",
        "1/4 tsp baking powder",
        "3 tbsp milk",
        "2 tbsp oil",
        "Chocolate chips (optional)",
        "Pinch of salt"
      ],
      steps: [
        "In a mug, mix flour, cocoa, sugar, baking powder, salt.",
        "Add milk and oil; mix until smooth.",
        "Fold in chocolate chips if using.",
        "Microwave 60–90 seconds (watch it rise).",
        "Cool 1 minute and eat carefully (hot!)."
      ]
    }
  ];

  // ---------------------------
  // STATE (private)
  // ---------------------------
  let currentFilter = "all";
  let currentSort = "title-asc";

  // ---------------------------
  // HELPERS (private)
  // ---------------------------
  const byDifficulty = (filter) => (r) =>
    filter === "all" ? true : r.difficulty === filter;

  const sortRecipes = (list, sortKey) => {
    const copy = [...list];

    const comparators = {
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
      "time-asc": (a, b) => a.cookTime - b.cookTime,
      "time-desc": (a, b) => b.cookTime - a.cookTime
    };

    return copy.sort(comparators[sortKey] || comparators["title-asc"]);
  };

  const setActiveFilterButton = (filter) => {
    const filterRow = document.getElementById("filterRow");
    if (!filterRow) return;

    [...filterRow.querySelectorAll(".chip")].forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });
  };

  const updateCountText = (shown, total) => {
    const el = document.getElementById("countText");
    if (!el) return;
    el.textContent = `Showing ${shown} of ${total}`;
  };

  // ---------------------------
  // RECURSION: Render nested steps
  // ---------------------------
  const renderSteps = (steps, level = 0) => {
    // Base expectation: steps is an array
    if (!Array.isArray(steps) || steps.length === 0) return "";

    const stepItemsHTML = steps
      .map((step) => {
        // Case 1: String step
        if (typeof step === "string") {
          return `
            <li class="step-item level-${level}">
              <span class="step-text">${escapeHTML(step)}</span>
            </li>
          `;
        }

        // Case 2: Object step with substeps
        if (step && typeof step === "object" && step.text) {
          const hasSubs = Array.isArray(step.substeps) && step.substeps.length > 0;
          const subHTML = hasSubs
            ? `<div class="substeps">${renderSubSteps(step.substeps, level + 1)}</div>`
            : "";

          return `
            <li class="step-item level-${level}">
              <span class="step-text">${escapeHTML(step.text)}</span>
              ${subHTML}
            </li>
          `;
        }

        // Fallback
        return "";
      })
      .join("");

    return `<ol class="steps-list">${stepItemsHTML}</ol>`;
  };

  const renderSubSteps = (substeps, level) => {
    if (!Array.isArray(substeps) || substeps.length === 0) return "";

    const items = substeps
      .map((s) => {
        if (typeof s === "string") {
          return `<div class="substep-item">→ ${escapeHTML(s)}</div>`;
        }
        if (s && typeof s === "object" && s.text) {
          const deeper = Array.isArray(s.substeps) && s.substeps.length
            ? `<div class="substeps">${renderSubSteps(s.substeps, level + 1)}</div>`
            : "";
          return `
            <div class="substep-item level-${level}">
              → ${escapeHTML(s.text)}
              ${deeper}
            </div>
          `;
        }
        return "";
      })
      .join("");

    return items;
  };

  const createStepsHTML = (steps) => {
    return renderSteps(steps, 0);
  };

  const createIngredientsHTML = (ingredients) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) return "";
    const li = ingredients.map((i) => `<li>${escapeHTML(i)}</li>`).join("");
    return `<ul class="ingredients-list">${li}</ul>`;
  };

  // Minimal HTML escaping for safety
  const escapeHTML = (str) => {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };

  // ---------------------------
  // UI RENDER
  // ---------------------------
  const createRecipeCard = (recipe) => {
    return `
      <article class="card" data-recipe-id="${recipe.id}">
        <div class="card-head">
          <div>
            <h3 class="title">${escapeHTML(recipe.title)}</h3>
          </div>
          <div class="badges">
            <span class="badge">${escapeHTML(recipe.difficulty.toUpperCase())}</span>
            <span class="badge">${recipe.cookTime} min</span>
          </div>
        </div>

        <p class="desc">${escapeHTML(recipe.description)}</p>

        <div class="actions">
          <button
            class="toggle-btn"
            data-recipe-id="${recipe.id}"
            data-toggle="steps"
            type="button"
          >Show Steps</button>

          <button
            class="toggle-btn"
            data-recipe-id="${recipe.id}"
            data-toggle="ingredients"
            type="button"
          >Show Ingredients</button>
        </div>

        <div class="divider"></div>

        <section class="steps-container" data-recipe-id="${recipe.id}">
          <h4 class="section-title">Steps</h4>
          ${createStepsHTML(recipe.steps)}
        </section>

        <section class="ingredients-container" data-recipe-id="${recipe.id}">
          <h4 class="section-title">Ingredients</h4>
          ${createIngredientsHTML(recipe.ingredients)}
        </section>
      </article>
    `;
  };

  const renderRecipes = (list) => {
    const container = document.getElementById("recipeContainer");
    if (!container) return;

    container.innerHTML = list.map(createRecipeCard).join("");
    updateCountText(list.length, recipes.length);
  };

  // IMPORTANT: Because Part 3 says expanded sections should stay expanded
  // across filters/sorts, we store expansion state by recipeId+type.
  const expandedState = {
    steps: new Set(),
    ingredients: new Set()
  };

  const applyExpandedStateToDOM = () => {
    const container = document.getElementById("recipeContainer");
    if (!container) return;

    // Steps
    expandedState.steps.forEach((recipeId) => {
      const sec = container.querySelector(`.steps-container[data-recipe-id="${recipeId}"]`);
      const btn = container.querySelector(`.toggle-btn[data-recipe-id="${recipeId}"][data-toggle="steps"]`);
      if (sec) sec.classList.add("visible");
      if (btn) btn.textContent = "Hide Steps";
    });

    // Ingredients
    expandedState.ingredients.forEach((recipeId) => {
      const sec = container.querySelector(`.ingredients-container[data-recipe-id="${recipeId}"]`);
      const btn = container.querySelector(`.toggle-btn[data-recipe-id="${recipeId}"][data-toggle="ingredients"]`);
      if (sec) sec.classList.add("visible");
      if (btn) btn.textContent = "Hide Ingredients";
    });
  };

  const updateDisplay = () => {
    const filtered = recipes.filter(byDifficulty(currentFilter));
    const sorted = sortRecipes(filtered, currentSort);
    renderRecipes(sorted);
    applyExpandedStateToDOM();
  };

  // ---------------------------
  // EVENT HANDLERS (delegation)
  // ---------------------------
  const handleToggleClick = (e) => {
    const button = e.target.closest(".toggle-btn");
    if (!button) return;

    const recipeId = button.dataset.recipeId;
    const toggleType = button.dataset.toggle; // "steps" or "ingredients"

    const card = e.target.closest(".card");
    if (!card) return;

    const selector =
      toggleType === "steps"
        ? `.steps-container[data-recipe-id="${recipeId}"]`
        : `.ingredients-container[data-recipe-id="${recipeId}"]`;

    const section = card.querySelector(selector);
    if (!section) return;

    const nowVisible = section.classList.toggle("visible");

    // Persist state
    if (toggleType === "steps") {
      nowVisible ? expandedState.steps.add(recipeId) : expandedState.steps.delete(recipeId);
      button.textContent = nowVisible ? "Hide Steps" : "Show Steps";
    } else if (toggleType === "ingredients") {
      nowVisible ? expandedState.ingredients.add(recipeId) : expandedState.ingredients.delete(recipeId);
      button.textContent = nowVisible ? "Hide Ingredients" : "Show Ingredients";
    }
  };

  const handleFilterClick = (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;

    const filter = btn.dataset.filter;
    if (!filter) return;

    currentFilter = filter;
    setActiveFilterButton(currentFilter);
    updateDisplay();
  };

  const handleSortChange = (e) => {
    currentSort = e.target.value;
    updateDisplay();
  };

  const setupEventListeners = () => {
    const recipeContainer = document.getElementById("recipeContainer");
    const filterRow = document.getElementById("filterRow");
    const sortSelect = document.getElementById("sortSelect");

    if (recipeContainer) {
      recipeContainer.addEventListener("click", handleToggleClick);
    }

    if (filterRow) {
      filterRow.addEventListener("click", handleFilterClick);
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", handleSortChange);
    }

    console.log("Event listeners attached!");
  };

  // ---------------------------
  // PUBLIC API
  // ---------------------------
  const init = () => {
    setupEventListeners();
    setActiveFilterButton(currentFilter);
    updateDisplay();
    console.log("RecipeApp ready!");
  };

  return {
    init,
    updateDisplay
  };
})();

// Boot
document.addEventListener("DOMContentLoaded", () => {
  RecipeApp.init();
});
