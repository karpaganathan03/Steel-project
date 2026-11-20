(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function init() {
    const bar = document.querySelector("[data-scroll-progress]");
    if (!bar) return;

    let pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    function updatePageHeight() {
      pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    }

    let scheduled = false;
    function updateProgress() {
      const progress = pageHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / pageHeight)) : 0;
      bar.style.setProperty("--scroll-progress", String(progress));
      scheduled = false;
    }

    function scheduleUpdate() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(updateProgress);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", function () {
      updatePageHeight();
      scheduleUpdate();
    }, { passive: true });
    updatePageHeight();
    updateProgress();
  }

  modules.scrollProgress = { init: init };
}());
