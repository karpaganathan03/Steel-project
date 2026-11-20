(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function initTestimonialSlider() {
    const slider = document.querySelector("[data-about-slider]");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll("[data-about-slide]"));
    const dots = Array.from(slider.querySelectorAll("[data-about-slide-to]"));
    const previous = slider.querySelector("[data-about-previous]");
    const next = slider.querySelector("[data-about-next]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!slides.length || dots.length !== slides.length || !previous || !next) {
      console.error("The About testimonial slider requires matching slides, dots and previous/next controls.");
      return;
    }

    let activeIndex = 0;
    let timer = null;
    let hovered = false;
    let focused = false;
    let touchStartX = null;

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        const active = slideIndex === activeIndex;
        slide.hidden = !active;
        slide.setAttribute("aria-label", (slideIndex + 1) + " of " + slides.length);
      });
      dots.forEach(function (dot, dotIndex) {
        dot.setAttribute("aria-current", String(dotIndex === activeIndex));
      });
    }

    function pause() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function resume() {
      pause();
      if (reducedMotion.matches || hovered || focused || document.hidden) return;
      timer = window.setInterval(function () {
        showSlide(activeIndex + 1);
      }, 6000);
    }

    previous.addEventListener("click", function () {
      showSlide(activeIndex - 1);
      resume();
    });
    next.addEventListener("click", function () {
      showSlide(activeIndex + 1);
      resume();
    });
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        showSlide(index);
        resume();
      });
    });

    slider.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const step = (event.key === "ArrowRight") !== (document.documentElement.dir === "rtl") ? 1 : -1;
      showSlide(activeIndex + step);
      resume();
      event.preventDefault();
    });
    slider.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "touch" && !event.target.closest("button")) {
        touchStartX = event.clientX;
      }
    });
    slider.addEventListener("pointerup", function (event) {
      if (touchStartX === null) return;
      const distance = event.clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 48) return;
      const forward = (distance < 0) !== (document.documentElement.dir === "rtl");
      showSlide(activeIndex + (forward ? 1 : -1));
      resume();
    });
    slider.addEventListener("pointercancel", function () {
      touchStartX = null;
    });
    slider.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch") return;
      hovered = true;
      pause();
    });
    slider.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch") return;
      hovered = false;
      resume();
    });
    slider.addEventListener("focusin", function () {
      focused = true;
      pause();
    });
    slider.addEventListener("focusout", function (event) {
      if (!slider.contains(event.relatedTarget)) {
        focused = false;
        resume();
      }
    });

    document.addEventListener("visibilitychange", resume);
    reducedMotion.addEventListener("change", resume);
    showSlide(0);
    resume();
  }

  modules.about = { init: initTestimonialSlider };
}());
