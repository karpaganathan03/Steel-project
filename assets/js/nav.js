(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function init() {
    const header = document.querySelector(".site-header");
    const navigation = document.querySelector("#primary-navigation");
    const menuButton = document.querySelector("[data-nav-toggle]");
    const directionToggle = document.querySelector("[data-direction-toggle]");
    const backdrop = document.querySelector("[data-nav-close]");
    const media = window.matchMedia("(max-width: 1023px)");
    if (!header || !navigation || !menuButton || !backdrop) return;

    let activeDropdown = null;

    function focusableItems() {
      return Array.from(navigation.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (element) {
        return element.getClientRects().length > 0;
      });
    }

    function closeDropdown(returnFocus, item) {
      const dropdownItem = item || (activeDropdown && activeDropdown.closest(".site-nav__item--dropdown"));
      if (!dropdownItem) return;
      const toggle = dropdownItem.querySelector("[data-dropdown-toggle]");
      if (!toggle) return;
      toggle.setAttribute("aria-expanded", "false");
      dropdownItem.classList.add("is-dismissed");
      dropdownItem.classList.remove("is-open");
      if (activeDropdown === toggle) activeDropdown = null;
      if (returnFocus) toggle.focus();
    }

    function closeDrawer(returnFocus) {
      if (!media.matches || !navigation.classList.contains("is-open")) return;
      closeDropdown(false);
      navigation.classList.remove("is-open");
      navigation.setAttribute("aria-hidden", "true");
      navigation.setAttribute("inert", "");
      menuButton.setAttribute("aria-expanded", "false");
      updateMenuLabel();
      document.body.classList.remove("nav-open");
      if (directionToggle) directionToggle.removeAttribute("inert");
      backdrop.classList.remove("is-visible");
      if (returnFocus) menuButton.focus();
    }

    function openDrawer() {
      if (!media.matches || navigation.classList.contains("is-open")) return;
      navigation.removeAttribute("inert");
      navigation.setAttribute("aria-hidden", "false");
      navigation.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      updateMenuLabel();
      document.body.classList.add("nav-open");
      if (directionToggle) directionToggle.setAttribute("inert", "");
      backdrop.classList.add("is-visible");
      const items = focusableItems();
      if (items.length) items[0].focus();
    }

    function syncLayout() {
      closeDropdown(false);
      if (media.matches) {
        navigation.classList.remove("is-open");
        navigation.setAttribute("aria-hidden", "true");
        navigation.setAttribute("inert", "");
        menuButton.setAttribute("aria-expanded", "false");
        updateMenuLabel();
        backdrop.classList.remove("is-visible");
        document.body.classList.remove("nav-open");
        if (directionToggle) directionToggle.removeAttribute("inert");
      } else {
        navigation.classList.remove("is-open");
        navigation.removeAttribute("aria-hidden");
        navigation.removeAttribute("inert");
        menuButton.setAttribute("aria-expanded", "false");
        updateMenuLabel();
        backdrop.classList.remove("is-visible");
        document.body.classList.remove("nav-open");
        if (directionToggle) directionToggle.removeAttribute("inert");
      }
    }

    menuButton.addEventListener("click", function () {
      if (navigation.classList.contains("is-open")) closeDrawer(false);
      else openDrawer();
    });

    backdrop.addEventListener("click", function () {
      closeDrawer(true);
    });

    navigation.addEventListener("click", function (event) {
      const toggle = event.target.closest("[data-dropdown-toggle]");
      if (toggle) {
        const dropdownItem = toggle.closest(".site-nav__item--dropdown");
        const isExpanded = dropdownItem.classList.contains("is-open");
        closeDropdown(false);
        if (!isExpanded) {
          toggle.setAttribute("aria-expanded", "true");
          dropdownItem.classList.remove("is-dismissed");
          dropdownItem.classList.add("is-open");
          activeDropdown = toggle;
        }
        return;
      }

      if (event.target.closest("a[href]") && media.matches) closeDrawer(false);
    });

    navigation.querySelectorAll(".site-nav__item--dropdown").forEach(function (item) {
      const toggle = item.querySelector("[data-dropdown-toggle]");
      item.addEventListener("pointerenter", function () {
        if (!media.matches && !item.classList.contains("is-dismissed")) {
          toggle.setAttribute("aria-expanded", "true");
        }
      });
      item.addEventListener("pointerleave", function () {
        if (!media.matches && !item.classList.contains("is-open") && !item.contains(document.activeElement)) {
          toggle.setAttribute("aria-expanded", "false");
          item.classList.remove("is-dismissed");
        }
      });
      item.addEventListener("focusin", function () {
        if (!media.matches && !item.classList.contains("is-dismissed")) {
          toggle.setAttribute("aria-expanded", "true");
        }
      });
      item.addEventListener("focusout", function (event) {
        if (!media.matches && !item.contains(event.relatedTarget) && !item.matches(":hover")) {
          if (item.classList.contains("is-open")) {
            closeDropdown(false, item);
          } else {
            toggle.setAttribute("aria-expanded", "false");
            item.classList.remove("is-dismissed");
          }
        }
      });
    });

    navigation.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const dropdownItem = event.target.closest(".site-nav__item--dropdown");
        const dropdownToggle = dropdownItem && dropdownItem.querySelector("[data-dropdown-toggle]");
        const dropdownOpen = dropdownItem && (
          dropdownItem.classList.contains("is-open") ||
          dropdownToggle.getAttribute("aria-expanded") === "true"
        );
        if (activeDropdown || dropdownOpen) {
          closeDropdown(true, dropdownItem);
          event.stopPropagation();
        } else if (media.matches) {
          closeDrawer(true);
        }
        return;
      }

      if (event.key === "Tab" && media.matches && navigation.classList.contains("is-open")) {
        const items = focusableItems();
        if (!items.length) {
          event.preventDefault();
          menuButton.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener("click", function (event) {
      if (activeDropdown && !activeDropdown.closest(".site-nav__item--dropdown").contains(event.target)) {
        closeDropdown(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && media.matches && navigation.classList.contains("is-open")) {
        closeDrawer(true);
      }
    });

    function updateShadow() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    function updateMenuLabel() {
      const labels = window.SteelData && window.SteelData.i18n.en;
      if (labels) {
        menuButton.setAttribute("aria-label", labels[
          menuButton.getAttribute("aria-expanded") === "true" ? "closeMenu" : "openMenu"
        ]);
      }
    }
    window.addEventListener("scroll", updateShadow, { passive: true });
    window.addEventListener("resize", syncLayout);
    media.addEventListener("change", syncLayout);
    syncLayout();
    updateShadow();
  }

  modules.navigation = { init: init };
}());
