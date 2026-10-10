/* ==================================================
   PAGE TRIER / REVALORISER — REVAL'0'RESTO
   Recherche et filtres du guide des déchets
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("tri-search");
  const filterButtons = document.querySelectorAll(".tri-filter");
  const wasteCards = Array.from(
    document.querySelectorAll(".tri-waste-card")
  );
  const resultsStatus = document.getElementById("tri-results-status");
  const noResults = document.getElementById("tri-no-results");
  const resetButton = document.getElementById("tri-reset");

  if (
    !searchInput ||
    !filterButtons.length ||
    !wasteCards.length ||
    !resultsStatus ||
    !noResults ||
    !resetButton
  ) {
    return;
  }

  let activeFilter = "all";

  function normalizeText(value) {
    return value
      .toLocaleLowerCase("fr")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function updateCards() {
    const query = normalizeText(searchInput.value);
    let visibleCount = 0;

    wasteCards.forEach((card) => {
      const category = card.dataset.category || "";
      const cardText = normalizeText(card.textContent);

      const matchesCategory =
        activeFilter === "all" || category === activeFilter;

      const matchesSearch =
        query === "" || cardText.includes(query);

      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    noResults.hidden = visibleCount !== 0;

    resultsStatus.textContent =
      visibleCount === 1
        ? "1 catégorie de déchets affichée."
        : `${visibleCount} catégories de déchets affichées.`;
  }

  function setActiveFilter(button) {
    activeFilter = button.dataset.filter || "all";

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    updateCards();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button);
    });
  });

  searchInput.addEventListener("input", updateCards);

  resetButton.addEventListener("click", () => {
    searchInput.value = "";

    const allButton = Array.from(filterButtons).find(
      (button) => button.dataset.filter === "all"
    );

    if (allButton) {
      setActiveFilter(allButton);
    } else {
      activeFilter = "all";
      updateCards();
    }

    searchInput.focus();
  });

  updateCards();
});
