(function () {
  "use strict";

  function runChecks() {
    const results = document.getElementById("test-results");
    const summary = document.getElementById("test-summary");
    const passed = [];
    const failed = [];

    function check(name, assertion) {
      try {
        if (!assertion()) throw new Error("Assertion failed");
        passed.push(name);
      } catch (error) {
        failed.push(name + ": " + error.message);
      }
    }

    const header = document.querySelector(".site-header");
    const footer = document.querySelector(".site-footer");
    const nav = document.querySelector("#primary-navigation");
    const headerHost = document.querySelector("#site-header");
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const directionToggle = document.querySelector("[data-direction-toggle]");
    const menuToggle = document.querySelector("[data-nav-toggle]");
    const currentYear = String(new Date().getFullYear());

    check("Shared header and navigation render", function () {
      return Boolean(header && nav && nav.querySelectorAll(".site-nav__link").length >= 8);
    });
    check("Footer renders six social links and the current year", function () {
      return Boolean(footer &&
        footer.querySelectorAll(".social-links a").length === 6 &&
        footer.querySelector("[data-footer-year]").textContent === currentYear);
    });
    check("Root/page-relative navigation paths resolve", function () {
      return nav.querySelector('a[href="./pages/contact.html"]') !== null &&
        nav.querySelector('a[href="./pages/products-grade.html"]') !== null &&
        nav.querySelector('a[href="./index.html"]') !== null &&
        nav.querySelector('a[href="./pages/home-2.html"]') !== null;
    });
    check("Home dropdown has two descriptive destinations", function () {
      const links = Array.from(nav.querySelectorAll("#index-submenu a"));
      return links.length === 2 &&
        links[0].textContent === "Steel Supply & Product Highlights" &&
        links[1].textContent === "Company, Products & Guides";
    });
    check("Header remains sticky at the viewport top", function () {
      return Boolean(headerHost &&
        getComputedStyle(headerHost).position === "sticky" &&
        Number.parseInt(getComputedStyle(headerHost).zIndex, 10) >= 200);
    });
    check("Header omits the phone while footer retains business contact details", function () {
      return Boolean(
        !header.querySelector('a[href^="tel:"]') &&
        footer.querySelector('a[href="tel:+919874561230"]') &&
        footer.textContent.includes("146(1), Sunvale Complex, Virudhunagar")
      );
    });

    if (themeToggle) {
      const initialTheme = document.documentElement.dataset.theme;
      themeToggle.click();
      check("Theme button changes theme and pressed state", function () {
        const activeIcon = document.querySelector(
          document.documentElement.dataset.theme === "dark" ? ".theme-icon--sun" : ".theme-icon--moon"
        );
        return document.documentElement.dataset.theme !== initialTheme &&
          themeToggle.getAttribute("aria-pressed") === String(document.documentElement.dataset.theme === "dark") &&
          getComputedStyle(activeIcon).display !== "none";
      });
      themeToggle.click();
    } else {
      failed.push("Theme button is missing");
    }

    const initialDirection = document.documentElement.dir;
    const initialLanguage = document.documentElement.lang;
    const translatedContent = Array.from(document.querySelectorAll("[data-i18n]")).map(function (element) {
      return element.textContent;
    });
    if (directionToggle) {
      directionToggle.click();
      check("Direction button switches layout and pressed state only", function () {
        return document.documentElement.dir !== initialDirection &&
          directionToggle.getAttribute("aria-pressed") === String(document.documentElement.dir === "rtl") &&
          directionToggle.textContent.trim() === (document.documentElement.dir === "rtl" ? "RTL" : "LTR") &&
          document.documentElement.lang === initialLanguage &&
          Array.from(document.querySelectorAll("[data-i18n]")).every(function (element, index) {
            return element.textContent === translatedContent[index];
          });
      });
      directionToggle.click();
      check("Direction button restores the original layout direction", function () {
        return document.documentElement.dir === initialDirection &&
          directionToggle.getAttribute("aria-pressed") === String(initialDirection === "rtl");
      });
    } else {
      failed.push("Direction toggle is missing");
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile && menuToggle) {
      menuToggle.click();
      check("Mobile navigation opens and locks body scroll", function () {
        return nav.classList.contains("is-open") &&
          document.body.classList.contains("nav-open") &&
          document.querySelector("[data-nav-close]").classList.contains("is-visible") &&
          directionToggle.hasAttribute("inert") &&
          menuToggle.getAttribute("aria-expanded") === "true";
      });
      const items = Array.from(nav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (element) {
        return element.getClientRects().length > 0;
      });
      if (items.length) {
        items[items.length - 1].focus();
        nav.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
      }
      check("Mobile navigation traps focus at the drawer boundary", function () {
        return !items.length || document.activeElement === items[0];
      });
      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      check("Escape closes the mobile drawer and restores scrolling", function () {
        return !nav.classList.contains("is-open") &&
          !document.body.classList.contains("nav-open") &&
          !directionToggle.hasAttribute("inert");
      });
      menuToggle.click();
      document.querySelector("[data-nav-close]").click();
      check("Backdrop click closes the mobile drawer", function () {
        return !nav.classList.contains("is-open") &&
          !document.body.classList.contains("nav-open") &&
          menuToggle.getAttribute("aria-expanded") === "false";
      });
    } else {
      passed.push("Mobile drawer checks skipped at desktop width");
    }

    const dropdownToggle = nav.querySelector("[data-dropdown-toggle]");
    if (dropdownToggle) {
      if (isMobile && menuToggle && !nav.classList.contains("is-open")) menuToggle.click();
      dropdownToggle.click();
      check("Product dropdown opens by button", function () {
        return dropdownToggle.getAttribute("aria-expanded") === "true";
      });
      nav.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
      check("Escape closes the navigation dropdown", function () {
        return dropdownToggle.getAttribute("aria-expanded") === "false";
      });
      if (isMobile && nav.classList.contains("is-open")) menuToggle.click();
    } else {
      failed.push("Product dropdown toggle is missing");
    }

    window.dispatchEvent(new Event("scroll"));
    check("Scroll progress bar initializes", function () {
      const progress = document.querySelector("[data-scroll-progress]");
      return Boolean(progress && progress.style.getPropertyValue("--scroll-progress") !== "");
    });

    results.innerHTML = "";
    passed.forEach(function (name) {
      const item = document.createElement("li");
      item.textContent = "PASS - " + name;
      results.appendChild(item);
    });
    failed.forEach(function (name) {
      const item = document.createElement("li");
      item.textContent = "FAIL - " + name;
      results.appendChild(item);
    });
    summary.textContent = failed.length
      ? failed.length + " check(s) failed; " + passed.length + " passed."
      : "All " + passed.length + " applicable checks passed.";
    summary.dataset.status = failed.length ? "failed" : "passed";
  }

  document.addEventListener("DOMContentLoaded", runChecks, { once: true });
}());
