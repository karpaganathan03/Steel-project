(function () {
  "use strict";

  const template = document.getElementById("style-panel-template");
  const container = document.getElementById("style-panels");
  if (!template || !container) return;

  [
    { theme: "light", title: "Left to right · Light" },
    { theme: "dark", title: "Left to right · Dark" }
  ].forEach(function (combination) {
    const fragment = template.content.cloneNode(true);
    const panel = fragment.querySelector(".style-panel");
    const heading = panel.querySelector("#combination-title");
    const code = panel.querySelector(".style-panel__head code");
    const suffix = "ltr-" + combination.theme;

    panel.id = suffix;
    panel.dir = "ltr";
    panel.dataset.theme = combination.theme;
    heading.textContent = combination.title;
    heading.id = "combination-title-" + suffix;
    panel.setAttribute("aria-labelledby", heading.id);
    code.textContent = 'dir="ltr" · data-theme="' + combination.theme + '"';

    panel.querySelectorAll("[id]").forEach(function (element) {
      if (element !== panel && element !== heading) element.id += "-" + suffix;
    });
    panel.querySelectorAll("label[for]").forEach(function (label) {
      label.htmlFor += "-" + suffix;
    });
    container.appendChild(fragment);
  });
}());
