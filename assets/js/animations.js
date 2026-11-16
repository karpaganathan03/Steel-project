(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initReveals() {
    const targets = Array.from(document.querySelectorAll(
      ".reveal, .section-heading, .card-grid > *, .grid--cards-2 > *, .grid--cards-3 > *, " +
      ".grid--cards-4 > *, .home-story-range > *, .home-story-brands > *, " +
      ".home-story-industries > *, .grid--12 > *, .products-hub__choice-grid > *, " +
      ".products-hub__category-grid > *, .products-grade__grid > *, " +
      ".size-product-card, .contact__cards > *, .contact__main-grid > *, " +
      ".price-enquiry__layout > *, .enquiry-aside-card, .project-card, .blog-card"
    ));
    const orderByGrid = new Map();

    targets.forEach(function (target) {
      target.classList.add("reveal");
      const parent = target.parentElement;
      const order = target.matches(".section-heading") ? 0 : (orderByGrid.get(parent) || 0);
      if (!target.matches(".section-heading")) orderByGrid.set(parent, order + 1);
      target.style.setProperty("--i", String(Math.min(order, 6)));
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initHeroEntrances() {
    document.querySelectorAll(".hero, .page-hero").forEach(function (hero) {
      hero.classList.add("hero-entrance");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          hero.classList.add("hero-entrance--ready");
        });
      });
      window.setTimeout(function () {
        hero.classList.remove("hero-entrance", "hero-entrance--ready");
      }, 1450);
    });
  }

  function initHeroSlider() {
    const hero = document.querySelector(".hero");
    const next = hero && hero.querySelector(".hero__arrow--next");
    const previous = hero && hero.querySelector(".hero__arrow--prev");
    if (!hero || !next || !previous || !hero.querySelector(".hero__dot")) return;

    let timer = null;
    let transitionTimer = null;
    let transitionStartedAt = 0;
    let hovered = false;
    let focused = false;
    let image = hero.querySelector(".hero__image");
    let finishImageTransition = null;
    const fadeDuration = 350;
    const autoplayDuration = 5000;

    function stopAutoplay() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
      hero.classList.remove("is-progressing");
    }

    function startAutoplay() {
      stopAutoplay();
      if (reducedMotion.matches || hovered || focused || document.hidden) return;

      window.requestAnimationFrame(function () {
        if (timer !== null) hero.classList.add("is-progressing");
      });
      timer = window.setInterval(function () {
        next.click();
      }, autoplayDuration);
    }

    function finishTransition() {
      const fadeOutRemaining = fadeDuration - (Date.now() - transitionStartedAt);
      if (fadeOutRemaining > 0) {
        if (transitionTimer !== null) window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(finishTransition, fadeOutRemaining);
        return;
      }

      if (image && finishImageTransition) {
        image.removeEventListener("load", finishImageTransition);
        finishImageTransition = null;
      }
      if (transitionTimer !== null) {
        window.clearTimeout(transitionTimer);
      }
      transitionTimer = window.setTimeout(function () {
        hero.classList.remove("is-changing");
        startAutoplay();
        transitionTimer = null;
      }, fadeDuration);
    }

    hero.addEventListener("click", function (event) {
      const control = event.target.closest(".hero__arrow, .hero__dot");
      if (!control) return;

      stopAutoplay();
      hero.classList.add("is-changing");
      if (transitionTimer !== null) window.clearTimeout(transitionTimer);
      transitionStartedAt = Date.now();

      image = hero.querySelector(".hero__image");
      if (image) {
        finishImageTransition = finishTransition;
        image.addEventListener("load", finishImageTransition, { once: true });
      }
      transitionTimer = window.setTimeout(finishTransition, fadeDuration * 2);
    }, true);

    hero.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.target.closest("input, textarea, select")) return;

      const isRtl = document.documentElement.dir === "rtl";
      const moveForward = (event.key === "ArrowRight") !== isRtl;
      (moveForward ? next : previous).click();
      event.preventDefault();
    });

    hero.addEventListener("pointerenter", function () {
      hovered = true;
      stopAutoplay();
    });
    hero.addEventListener("pointerleave", function () {
      hovered = false;
      startAutoplay();
    });
    hero.addEventListener("focusin", function () {
      focused = true;
      stopAutoplay();
    });
    hero.addEventListener("focusout", function (event) {
      if (!hero.contains(event.relatedTarget)) {
        focused = false;
        startAutoplay();
      }
    });

    document.addEventListener("visibilitychange", startAutoplay);
    reducedMotion.addEventListener("change", startAutoplay);
    startAutoplay();
  }

  function init() {
    document.documentElement.classList.add("js");
    if (reducedMotion.matches) {
      document.querySelectorAll(".reveal").forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }
    initReveals();
    initHeroEntrances();
    initHeroSlider();
  }

  document.addEventListener("DOMContentLoaded", init, { once: true });
}());
