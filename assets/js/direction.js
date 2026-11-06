(function () {
  "use strict";

  const root = document.documentElement;
  const storageKey = "forgeline-direction";
  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function getSavedDirection() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      console.warn("Layout direction preference could not be read from local storage.", error);
      return null;
    }
  }

  function saveDirection(direction) {
    try {
      window.localStorage.setItem(storageKey, direction);
    } catch (error) {
      console.warn("Layout direction preference could not be saved to local storage.", error);
    }
  }

  function setDirection(direction, persist) {
    const selectedDirection = direction === "rtl" ? "rtl" : "ltr";
    root.dir = selectedDirection;
    const toggle = document.querySelector("[data-direction-toggle]");
    const label = document.querySelector("[data-direction-label]");
    if (toggle) {
      const isRtl = selectedDirection === "rtl";
      toggle.setAttribute("aria-pressed", String(isRtl));
      toggle.setAttribute("aria-label", isRtl
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout");
      if (label) label.textContent = isRtl ? "RTL" : "LTR";
    }
    if (persist) saveDirection(selectedDirection);
  }

  function init() {
    const toggle = document.querySelector("[data-direction-toggle]");
    setDirection(getSavedDirection() || root.dir, false);
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      setDirection(root.dir === "rtl" ? "ltr" : "rtl", true);
    });
  }

  modules.direction = { init: init };
}());
