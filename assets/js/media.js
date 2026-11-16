(function () {
  "use strict";

  const root = document.documentElement;
  const imageSelector = ".media-frame > img, img.media-frame";

  function getFrame(image) {
    return image.matches("img.media-frame") ? image : image.closest(".media-frame");
  }

  function setPosterImage(image, frame, sourceOverride) {
    if (!frame.classList.contains("media--poster")) return;
    const source = sourceOverride || image.currentSrc || image.src;
    const escapedSource = source.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    frame.style.setProperty("--media-image", 'url("' + escapedSource + '")');
  }

  function refreshImage(image) {
    const frame = getFrame(image);
    if (!frame) return;

    const source = image.src;
    if (image.dataset.mediaSource === source) return;

    image.dataset.mediaSource = source;
    image.classList.remove("is-loaded");
    setPosterImage(image, frame, source);
  }

  function markMissing(image, frame) {
    frame.classList.add("media--missing");
    frame.dataset.mediaError = "true";
    image.classList.remove("is-loaded");
  }

  function markLoaded(image) {
    const frame = getFrame(image);
    if (!frame || !image.naturalWidth) return;
    frame.classList.remove("media--missing");
    delete frame.dataset.mediaError;
    image.classList.add("is-loaded");
  }

  function prepareImage(image) {
    const frame = getFrame(image);
    if (!frame || image.dataset.mediaInitialized) return;

    image.dataset.mediaInitialized = "true";
    image.dataset.mediaSource = image.src;
    setPosterImage(image, frame);
    image.addEventListener("load", function () {
      setPosterImage(image, frame);
      markLoaded(image);
    });
    image.addEventListener("error", function () {
      markMissing(image, frame);
    });

    if (image.complete) {
      if (image.naturalWidth) {
        markLoaded(image);
      } else {
        markMissing(image, frame);
      }
    }
  }

  function prepareSubtree(node) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches("img")) prepareImage(node);
    node.querySelectorAll("img").forEach(prepareImage);
  }

  document.querySelectorAll(imageSelector).forEach(prepareImage);

  const observer = new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === "attributes" && record.target.matches("img")) {
        refreshImage(record.target);
        return;
      }
      record.addedNodes.forEach(prepareSubtree);
    });
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["src"],
    childList: true,
    subtree: true
  });

  root.classList.add("js", "media-ready");
}());
