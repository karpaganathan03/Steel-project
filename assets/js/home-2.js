(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function initCounters() {
    const counters = Array.from(document.querySelectorAll("[data-counter]"));
    if (!counters.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function showFinalValue(counter) {
      counter.textContent = counter.dataset.counter + (counter.dataset.counterSuffix || "");
    }

    function animate(counter) {
      const target = Number(counter.dataset.counter);
      if (!Number.isFinite(target) || target < 0) {
        console.error("Invalid home page counter value.", counter);
        return;
      }
      if (reducedMotion) {
        showFinalValue(counter);
        return;
      }

      const duration = 900;
      const started = performance.now();
      function frame(now) {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased) + (counter.dataset.counterSuffix || "");
        if (progress < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }

    if (reducedMotion || !("IntersectionObserver" in window)) {
      counters.forEach(showFinalValue);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initTestimonialSlider() {
    const slider = document.querySelector("[data-testimonial-slider]");
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll("[data-slide]"));
    const dots = Array.from(slider.querySelectorAll("[data-slide-to]"));
    const previous = slider.querySelector("[data-slide-previous]");
    const next = slider.querySelector("[data-slide-next]");
    if (!slides.length || dots.length !== slides.length || !previous || !next) {
      console.error("The testimonial slider requires matching slides, dots and previous/next controls.");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeIndex = 0;
    let timer = null;
    let hovered = false;
    let focused = false;

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
    slider.addEventListener("pointerenter", function () {
      hovered = true;
      pause();
    });
    slider.addEventListener("pointerleave", function () {
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

  function init() {
    initCounters();
    initTestimonialSlider();
  }

  modules.home2 = { init: init };
}());
