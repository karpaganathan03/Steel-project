(function () {
  "use strict";

  const root = document.documentElement;
  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function getSavedTheme() {
    try {
      return localStorage.getItem("forgeline-theme");
    } catch (error) {
      console.warn("Theme preference could not be read from local storage.", error);
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("forgeline-theme", theme);
    } catch (error) {
      console.warn("Theme preference could not be saved to local storage.", error);
    }
  }

  function init() {
    const toggle = document.querySelector("[data-theme-toggle]");
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = getSavedTheme();

    function applyTheme(theme) {
      const selectedTheme = theme === "dark" ? "dark" : "light";
      root.dataset.theme = selectedTheme;
      if (toggle) {
        const isDark = selectedTheme === "dark";
        const labels = window.SteelData && window.SteelData.i18n.en;
        const label = labels
          ? labels[isDark ? "themeLight" : "themeDark"]
          : (isDark ? "Switch to light theme" : "Switch to dark theme");
        toggle.setAttribute("aria-pressed", String(isDark));
        toggle.setAttribute("aria-label", label);
        toggle.setAttribute("title", label);
      }
    }

    applyTheme(savedTheme || (preference.matches ? "dark" : "light"));

    if (toggle) {
      toggle.addEventListener("click", function () {
        const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        saveTheme(nextTheme);
      });
    }

    if (!savedTheme) {
      preference.addEventListener("change", function (event) {
        applyTheme(event.matches ? "dark" : "light");
      });
    }
  }

  modules.theme = { init: init };
}());
