(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function init() {
    const bar = document.querySelector("[data-scroll-progress]");
    if (!bar) return;

    let scheduled = false;
    function updateProgress() {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
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
    window.addEventListener("resize", scheduleUpdate);
    updateProgress();
  }

  modules.scrollProgress = { init: init };
}());
