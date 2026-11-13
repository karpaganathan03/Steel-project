(function () {
  "use strict";

  // Rebar weights per meter for standard IS 1786 diameters
  const BAR_DATA = {
    "8": { weightPerMeter: 0.395, barsPerBundle: 10, name: "8 mm TMT Rebar" },
    "10": { weightPerMeter: 0.617, barsPerBundle: 7, name: "10 mm TMT Rebar" },
    "12": { weightPerMeter: 0.888, barsPerBundle: 5, name: "12 mm TMT Rebar" },
    "16": { weightPerMeter: 1.580, barsPerBundle: 3, name: "16 mm TMT Rebar" },
    "20": { weightPerMeter: 2.470, barsPerBundle: 2, name: "20 mm TMT Rebar" },
    "25": { weightPerMeter: 3.850, barsPerBundle: 1, name: "25 mm TMT Rebar" },
    "32": { weightPerMeter: 6.310, barsPerBundle: 1, name: "32 mm TMT Rebar" }
  };

  const BAR_LENGTH = 12; // meters

  function initEstimator() {
    const sizeSelect = document.getElementById("est-size");
    const gradeSelect = document.getElementById("est-grade");
    const quantityInput = document.getElementById("est-quantity");
    const weightPerBarEl = document.getElementById("est-unit-weight");
    const totalWeightEl = document.getElementById("est-total-weight");
    const totalTonnesEl = document.getElementById("est-total-tonnes");
    const bundleCountEl = document.getElementById("est-bundles");
    const quoteBtn = document.getElementById("est-quote-btn");

    if (!sizeSelect || !quantityInput || !totalWeightEl) return;

    function calculate() {
      const size = sizeSelect.value || "12";
      const count = Math.max(1, parseInt(quantityInput.value, 10) || 1);
      const spec = BAR_DATA[size] || BAR_DATA["12"];

      const weightPerBar = spec.weightPerMeter * BAR_LENGTH;
      const totalWeightKg = weightPerBar * count;
      const totalTonnes = totalWeightKg / 1000;
      const estimatedBundles = Math.ceil(count / spec.barsPerBundle);

      if (weightPerBarEl) weightPerBarEl.textContent = weightPerBar.toFixed(2) + " kg";
      if (totalWeightEl) totalWeightEl.textContent = Math.round(totalWeightKg).toLocaleString() + " kg";
      if (totalTonnesEl) totalTonnesEl.textContent = totalTonnes.toFixed(3) + " MT";
      if (bundleCountEl) bundleCountEl.textContent = "~" + estimatedBundles + " bundles (" + spec.barsPerBundle + " bars/bundle)";
    }

    sizeSelect.addEventListener("change", calculate);
    quantityInput.addEventListener("input", calculate);
    if (gradeSelect) gradeSelect.addEventListener("change", calculate);

    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        const size = sizeSelect.value;
        const grade = gradeSelect ? gradeSelect.value : "Fe 550D";
        const count = quantityInput.value;
        try {
          sessionStorage.setItem("forgeline_preset_quote", JSON.stringify({
            diameter: size + " mm",
            grade: grade,
            quantity: count + " bars (12m)"
          }));
        } catch (e) {
          // ignore storage failure
        }
      });
    }

    calculate();
  }

  function initHeroSlider() {
    const hero = document.querySelector(".hero");
    const prevBtn = document.querySelector(".hero__arrow--prev");
    const nextBtn = document.querySelector(".hero__arrow--next");
    const titleEl = document.getElementById("home-title");
    const eyebrowEl = document.querySelector(".hero .eyebrow");
    const descEl = document.querySelector(".hero p[data-i18n='homeDescription']");

    if (!hero || !prevBtn || !nextBtn || !titleEl) return;

    const slides = [
      {
        eyebrow: "Your trusted steel supply partner",
        titleStart: "Steel you can",
        titleAccent: "build on.",
        desc: "Quality TMT bars and construction steel, sourced with care and delivered with dependable support for your project.",
        image: "assets/images/Home page Hero 1.jpg",
        alt: "ForgeLine steel specialist inspecting certified rebar steel"
      },
      {
        eyebrow: "High-Tensile Certified Rebars",
        titleStart: "IS 1786 Fe 550D",
        titleAccent: "& Fe 500D Steel.",
        desc: "High ductility seismic-resistant rebars with optimal rib geometry, ensuring uncompromised concrete bond strength.",
        image: "assets/images/Product page Hero 2.jpg",
        alt: "Certified IS 1786 Fe 550D and Fe 500D high ductility reinforcement bars"
      },
      {
        eyebrow: "Direct Mill Supply Chain",
        titleStart: "Direct Dispatch",
        titleAccent: "to your job site.",
        desc: "Primary mill sourcing from Tata Tiscon, JSW Neosteel, SAIL, and Jindal Panther with computerized weighbridge slips.",
        image: "assets/images/Home page Hero 2.jpg",
        alt: "Direct primary mill steel supply for modern infrastructure and buildings"
      }
    ];

    let current = 0;

    function renderSlide(index) {
      const s = slides[index];
      if (eyebrowEl) eyebrowEl.textContent = s.eyebrow;
      titleEl.innerHTML = '<span data-i18n="homeHeadlineStart">' + s.titleStart + '</span> <span class="hero__title-accent" data-i18n="homeHeadlineAccent">' + s.titleAccent + '</span>';
      if (descEl) descEl.textContent = s.desc;
      const imgEl = hero.querySelector(".hero__image");
      if (imgEl && s.image) {
        imgEl.src = s.image;
        if (s.alt) imgEl.alt = s.alt;
      }
    }

    prevBtn.addEventListener("click", function () {
      current = (current - 1 + slides.length) % slides.length;
      renderSlide(current);
    });

    nextBtn.addEventListener("click", function () {
      current = (current + 1) % slides.length;
      renderSlide(current);
    });
  }

  function initFaq() {
    const accordions = document.querySelectorAll(".faq-item");
    accordions.forEach(function (item) {
      const btn = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!btn || !answer) return;

      btn.addEventListener("click", function () {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        accordions.forEach(function (other) {
          const otherBtn = other.querySelector(".faq-question");
          const otherAns = other.querySelector(".faq-answer");
          if (otherBtn && otherAns) {
            otherBtn.setAttribute("aria-expanded", "false");
            otherAns.hidden = true;
          }
        });
        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          answer.hidden = false;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initEstimator();
    initHeroSlider();
    initFaq();
  });
}());