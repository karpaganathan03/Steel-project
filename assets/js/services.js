(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function init() {
    const grid = document.querySelector("[data-services-grid]");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll("[data-service-card]"));
    const filters = Array.from(document.querySelectorAll("[data-service-filter]"));
    const views = Array.from(document.querySelectorAll("[data-service-view]"));
    const status = document.querySelector("[data-service-status]");
    if (!cards.length || !filters.length || !views.length || !status) {
      console.error("The services catalogue requires service cards, filters, view controls and a status region.");
      return;
    }

    let selectedCategory = "all";

    function updateStatus(visibleCount) {
      status.textContent = "Showing " + visibleCount + (visibleCount === 1 ? " service." : " services.");
    }

    function applyFilter(category) {
      selectedCategory = category;
      let visibleCount = 0;
      cards.forEach(function (card) {
        const visible = category === "all" || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      filters.forEach(function (filter) {
        const selected = filter.dataset.serviceFilter === category;
        filter.classList.toggle("is-active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      updateStatus(visibleCount);
    }

    function setView(view) {
      const listView = view === "list";
      grid.classList.toggle("services-grid--list", listView);
      views.forEach(function (button) {
        const selected = button.dataset.serviceView === view;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    }

    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        applyFilter(filter.dataset.serviceFilter);
      });
    });
    views.forEach(function (button) {
      button.addEventListener("click", function () {
        setView(button.dataset.serviceView);
      });
    });

    applyFilter(selectedCategory);
    setView("grid");
  }

  modules.services = { init: init };
}());
