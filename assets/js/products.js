(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function init() {
    const gradeContainer = document.querySelector("[data-grade-product-list]");
    if (gradeContainer) {
      initGradeProducts();
      return;
    }

    const sizePanel = document.querySelector("[data-size-panel]");
    if (sizePanel) {
      initSizeProducts();
      return;
    }

    const container = document.querySelector("[data-product-list]");
    if (!container || !window.SteelData) return;

    const gradeFilter = document.querySelector("[data-grade-filter]");
    const sizeFilter = document.querySelector("[data-size-filter]");
    const categoryFilter = document.querySelector("[data-category-filter]");
    const base = document.body.dataset.base || "..";
    const products = window.SteelData.products;

    function card(product) {
      return '<article class="product-card">' +
        '<div class="product-card__image media-frame"><img src="' + base + '/assets/images/products/' + product.image + '" alt="' + product.name + '" width="1200" height="900" loading="lazy" decoding="async"></div>' +
        '<div class="product-card__body"><span class="product-card__meta">' + product.category + '</span>' +
        '<h3>' + product.name + '</h3><p>' + product.details + '</p>' +
        '<p><strong>Grade:</strong> ' + product.grade + ' &nbsp; <strong>Size:</strong> ' + product.size + '</p>' +
        '<a class="text-link" href="' + base + '/pages/price-enquiry.html">Request pricing <span class="icon-dir" aria-hidden="true">→</span></a></div></article>';
    }

    function renderProducts() {
      const grade = gradeFilter ? gradeFilter.value : "";
      const size = sizeFilter ? sizeFilter.value : "";
      const category = categoryFilter ? categoryFilter.value : "";
      const results = products.filter(function (product) {
        return (!grade || product.grade === grade) &&
          (!size || product.size === size) &&
          (!category || product.category === category);
      });

      container.innerHTML = results.length
        ? results.map(card).join("")
        : '<p class="empty-state">No products match these filters. Try another grade, size or category.</p>';
    }

    [gradeFilter, sizeFilter, categoryFilter].forEach(function (filter) {
      if (filter) filter.addEventListener("change", renderProducts);
    });

    renderProducts();
  }

  function initSizeProducts() {
    const data = window.SteelData;
    const tabs = Array.from(document.querySelectorAll("[data-size-filter]"));
    const panel = document.querySelector("[data-size-panel]");
    const count = document.querySelector("[data-size-result-count]");
    const tableBody = document.querySelector("[data-size-comparison]");
    if (!data || !Array.isArray(data.steelSizes) || !tabs.length || !panel || !tableBody) {
      console.error("Size catalogue data or controls are unavailable.");
      return;
    }

    const base = document.body.dataset.base || "..";
    let activeSize = tabs[0].dataset.sizeFilter;

    const SIZE_IMAGE_MAP = {
      "8 mm": "8mm.jpg",
      "10 mm": "10mm.jpg",
      "12 mm": "12mm.jpg",
      "16 mm": "16mm.jpg",
      "20 mm": "20mm.jpg",
      "25 mm": "25mm.jpg",
      "32 mm": "32mm.jpg"
    };

    function text(key) {
      return data.i18n.en[key] || key;
    }

    function element(tagName, className, value) {
      const node = document.createElement(tagName);
      if (className) node.className = className;
      if (value !== undefined) node.textContent = value;
      return node;
    }

    function metric(label, value) {
      const item = element("div", "size-detail__metric");
      item.append(element("dt", "", label), element("dd", "", value));
      return item;
    }

    function renderSelectedSize(size) {
      const detail = element("div", "size-detail");
      const content = element("div", "size-detail__content");
      const heading = element("h3", "size-detail__heading", size.size);
      heading.id = "size-panel-heading";
      content.append(
        element("p", "eyebrow", text("sizeSelectedHeading")),
        heading
      );

      const metrics = element("dl", "size-detail__metrics");
      metrics.append(
        metric(text("sizeWeightLabel"), size.weightPerMetre.toFixed(3) + " kg/m"),
        metric(text("sizeBarsPerTonneLabel"), String(size.barsPerTonne)),
        metric(text("sizeLengthLabel"), size.standardLength)
      );
      content.appendChild(metrics);
      content.append(
        element("h4", "size-detail__subheading", text("sizeApplicationsLabel")),
        element("p", "size-detail__applications", size.applications.en)
      );

      const imageName = size.image || SIZE_IMAGE_MAP[size.size] || "placeholder.jpg";
      const imagePath = base + "/assets/images/" + imageName;

      const image = element("img", "", undefined);
      image.src = imagePath;
      image.alt = size.size + " " + text("sizeProductImageAlt");
      image.width = 1200;
      image.height = 900;
      image.loading = "lazy";
      image.decoding = "async";
      const figure = element("figure", "size-detail__image media-frame media--poster media--missing");
      figure.appendChild(image);
      detail.append(content, figure);

      const product = element("article", "size-product-card");
      const productMedia = element("div", "size-product-card__media media-frame media--poster media--missing");
      const productImage = element("img", "size-product-card__image");
      productImage.src = imagePath;
      productImage.alt = size.size + " " + text("sizeProductName");
      productImage.width = 1200;
      productImage.height = 900;
      productImage.loading = "lazy";
      productImage.decoding = "async";
      productMedia.appendChild(productImage);
      const productBody = element("div", "size-product-card__body");
      productBody.append(
        element("span", "product-card__meta", text("sizeProductName")),
        element("h4", "", size.size + " " + text("sizeProductName")),
        element("p", "size-product-card__grade", text("sizeProductGrade")),
        element("p", "", text("sizeProductDescription"))
      );
      const link = element("a", "btn-primary");
      const query = new URLSearchParams({ size: size.size, product: "TMT bars" });
      link.href = base + "/pages/price-enquiry.html?" + query.toString();
      link.append(
        document.createTextNode(text("sizeEnquiryButton") + " "),
        element("span", "icon-dir", "→")
      );
      link.lastElementChild.setAttribute("aria-hidden", "true");
      productBody.appendChild(link);
      product.append(productMedia, productBody);

      panel.replaceChildren(detail, product);
      panel.setAttribute("aria-labelledby", tabs.find(function (tab) {
        return tab.dataset.sizeFilter === activeSize;
      }).id);
    }

    function renderTable() {
      tableBody.replaceChildren();
      data.steelSizes.forEach(function (size) {
        const row = document.createElement("tr");
        [
          element("th", "", size.size),
          element("td", "", size.weightPerMetre.toFixed(3) + " kg/m"),
          element("td", "", String(size.barsPerTonne)),
          element("td", "", size.standardLength)
        ].forEach(function (cell, index) {
          if (index === 0) cell.scope = "row";
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });
    }

    function render() {
      const selectedSize = data.steelSizes.find(function (size) {
        return size.size === activeSize;
      });
      if (!selectedSize) {
        console.error("No size catalogue record found for " + activeSize + ".");
        return;
      }

      renderSelectedSize(selectedSize);
      renderTable();
      if (count) {
        count.textContent = text(data.steelSizes.length === 1 ? "sizeCountOne" : "sizeCount")
          .replace("{count}", String(data.steelSizes.length));
      }

      tabs.forEach(function (tab) {
        const selected = tab.dataset.sizeFilter === activeSize;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
    }

    function selectTab(tab, moveFocus) {
      activeSize = tab.dataset.sizeFilter;
      render();
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        let nextIndex = index;
        if ((event.key === "ArrowRight") !== (document.documentElement.dir === "rtl")) nextIndex = (index + 1) % tabs.length;
        else if ((event.key === "ArrowLeft") !== (document.documentElement.dir === "rtl")) nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });

    render();
  }

  function initGradeProducts() {
    const data = window.SteelData;
    const tabs = Array.from(document.querySelectorAll("[data-grade-filter]"));
    const count = document.querySelector("[data-grade-result-count]");
    const panel = document.querySelector("[data-grade-product-list]");
    if (!data || !Array.isArray(data.steelGrades) || !tabs.length || !panel) {
      console.error("Grade catalogue data or controls are unavailable.");
      return;
    }

    const base = document.body.dataset.base || "..";
    let activeGrade = "all";

    const GRADE_IMAGE_MAP = {
      "Fe 415": "Fe 415.jpg",
      "Fe 500": "Fe 500.jpg",
      "Fe 500D": "Fe 500D.jpg",
      "Fe 550": "Fe 550.jpg",
      "Fe 550D": "Fe 550D.jpg",
      "Fe 600": "Fe 600.jpg",
      "Fe 415D": "FE 415D.jpg",
      "Fe 500S": "FE 500S.jpg"
    };
    const POSTER_GRADES = new Set(["Fe 550", "Fe 550D", "Fe 600", "Fe 415D", "Fe 500S"]);
    const NEUTRAL_GRADES = new Set(["Fe 415"]);

    function text(key) {
      return data.i18n.en[key] || key;
    }

    function element(tagName, className, value) {
      const node = document.createElement(tagName);
      if (className) node.className = className;
      if (value !== undefined) node.textContent = value;
      return node;
    }

    function renderCard(grade) {
      const card = element("article", "grade-card");

      const rawName = grade.name || "";
      const imageName = grade.image || GRADE_IMAGE_MAP[rawName] || rawName + ".jpg";
      let mediaClass = "";
      if (POSTER_GRADES.has(rawName)) {
        mediaClass = " media--poster media--missing";
      } else if (NEUTRAL_GRADES.has(rawName)) {
        mediaClass = " media--missing";
      }
      const imageBox = element("div", "grade-card__image product-card__image media-frame" + mediaClass);
      const img = element("img", "", undefined);
      img.src = base + "/assets/images/" + imageName;
      img.alt = (grade.displayTitle || grade.name) + " TMT reinforcement steel rebar";
      img.width = 1200;
      img.height = 900;
      img.loading = "lazy";
      img.decoding = "async";
      if (rawName === "Fe 415D" || rawName === "Fe 500S") {
        imageBox.appendChild(document.createComment(" Replace with: " + rawName + " TMT bar photo "));
      }
      imageBox.appendChild(img);
      card.appendChild(imageBox);

      const header = element("div", "grade-card__header");
      const title = element("h3", "", grade.displayTitle || grade.name);
      const badge = element("span", "badge", grade.name);
      header.append(title, badge);
      card.appendChild(header);

      const metrics = element("dl", "grade-card__metrics");
      [
        [text("gradeYieldLabel"), grade.yieldStrength],
        [text("gradeElongationLabel"), grade.elongation]
      ].forEach(function (pair) {
        const group = element("div", "grade-card__metric");
        group.append(element("dt", "", pair[0]), element("dd", "", pair[1]));
        metrics.appendChild(group);
      });
      card.appendChild(metrics);

      card.appendChild(element("h4", "grade-card__subheading", text("gradeTypicalUsesLabel")));
      card.appendChild(element("p", "grade-card__uses", grade.uses.en));
      card.appendChild(element("h4", "grade-card__subheading", text("gradeAvailableSizesLabel")));

      const sizes = element("ul", "grade-card__sizes");
      grade.sizes.forEach(function (size) {
        sizes.appendChild(element("li", "", size));
      });
      card.appendChild(sizes);

      const link = element("a", "btn-primary");
      const query = new URLSearchParams({ grade: grade.name, product: "TMT bars" });
      link.href = base + "/pages/price-enquiry.html?" + query.toString();
      link.appendChild(document.createTextNode(text("gradeCardCta") + " "));
      const arrow = element("span", "icon-dir", "→");
      arrow.setAttribute("aria-hidden", "true");
      link.appendChild(arrow);
      card.appendChild(link);
      return card;
    }

    function render() {
      const visibleGrades = activeGrade === "all"
        ? data.steelGrades
        : data.steelGrades.filter(function (grade) {
          return grade.name === activeGrade;
        });

      const noResults = element("p", "empty-state", text("gradeTabNoResults"));
      panel.replaceChildren();
      if (visibleGrades.length) {
        visibleGrades.forEach(function (grade) {
          panel.appendChild(renderCard(grade));
        });
      } else {
        panel.appendChild(noResults);
      }

      if (count) {
        const countKey = visibleGrades.length === 1 ? "gradeTabCountOne" : "gradeTabCount";
        count.textContent = text(countKey).replace("{count}", String(visibleGrades.length));
      }

      tabs.forEach(function (tab) {
        const selected = tab.dataset.gradeFilter === activeGrade;
        if (tab.dataset.gradeFilter === "all") {
          tab.textContent = text("gradeTabAll");
        }
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected) panel.setAttribute("aria-labelledby", tab.id);
      });
    }

    function selectTab(tab, moveFocus) {
      if (!tab) return;
      activeGrade = tab.dataset.gradeFilter;
      render();
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        let nextIndex = index;
        if ((event.key === "ArrowRight") !== (document.documentElement.dir === "rtl")) nextIndex = (index + 1) % tabs.length;
        else if ((event.key === "ArrowLeft") !== (document.documentElement.dir === "rtl")) nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;

        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });

    render();
  }

  modules.products = { init: init };
}());
