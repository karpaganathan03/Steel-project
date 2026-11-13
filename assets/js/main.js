(function () {
  "use strict";

  const root = document.documentElement;
  const pathname = window.location.pathname;
  const inPagesDirectory = /\/pages\//i.test(pathname);
  const base = inPagesDirectory ? ".." : ".";
  const filename = pathname.split("/").pop() || "index.html";
  const currentPage = filename === "index.html" ? "index" : filename.replace(/\.html$/i, "");
  const modules = window.SteelSiteModules = window.SteelSiteModules || {};

  function localUrl(relativePath) {
    return base + "/" + relativePath;
  }

  function pageUrl(filename) {
    return filename === "index.html"
      ? localUrl(filename)
      : localUrl("pages/" + filename);
  }

  function icon(name) {
    const paths = {
      facebook: '<path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z"/>',
      instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>',
      x: '<path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.4 6.9L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5z"/>',
      linkedin: '<path d="M5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.2 9h3.6v12H3.2zM9 9h3.4v1.6h.1c.5-.9 1.7-2 3.5-2 3.8 0 4.5 2.5 4.5 5.7V21h-3.6v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9z"/>',
      youtube: '<path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1a31 31 0 0 0-.5 4.9 31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.6V8.4l6.2 3.6z"/>',
      whatsapp: '<path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6A11.8 11.8 0 0 0 20.5 3.5ZM12 21a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4A9.7 9.7 0 1 1 12 21Zm5.3-7.3c-.3-.1-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.2s-.7.9-.9 1.1-.3.2-.6.1a7.8 7.8 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + paths[name] + "</svg>";
  }

  function renderNavigation(data) {
    const items = data.navItems.map(function (item) {
      const isActive = item.page === currentPage || item.children && item.children.some(function (child) {
        return child.page === currentPage;
      });
      const active = item.page === currentPage ? ' aria-current="page"' : "";
      const href = pageUrl(item.href);
      if (!item.children) {
        return '<li><a class="site-nav__link" data-i18n="' + item.key + '" href="' + href + '"' + active + ">" + data.i18n.en[item.key] + "</a></li>";
      }

      const childItems = item.children.map(function (child) {
        const childActive = child.page === currentPage ? ' aria-current="page"' : "";
        return '<li><a class="site-nav__link" data-i18n="' + child.key + '" href="' + pageUrl(child.href) + '"' + childActive + ">" + data.i18n.en[child.key] + "</a></li>";
      }).join("");
      const dropdownLabel = item.page === "index" ? "Show home page options" : data.i18n.en.showCategories;

      return '<li class="site-nav__item site-nav__item--dropdown' + (isActive ? " is-active" : "") + '">' +
        '<div class="site-nav__product-row"><a class="site-nav__link" data-i18n="' + item.key + '" href="' + href + '"' + active + ">" + data.i18n.en[item.key] + "</a>" +
        '<button class="nav-dropdown__toggle icon-button" type="button" aria-label="' + dropdownLabel + '" aria-expanded="false" aria-controls="' + item.page + '-submenu" data-dropdown-toggle><span class="visually-hidden">' + dropdownLabel + "</span></button></div>" +
        '<ul class="site-nav__dropdown" id="' + item.page + '-submenu">' + childItems + "</ul></li>";
    }).join("");

    return items;
  }

  function renderHeader(data) {
    const host = document.getElementById("site-header");
    if (!host) return;

    host.innerHTML =
      '<header class="site-header"><div class="container site-header__inner">' +
      '<a class="brand" href="' + localUrl("index.html") + '">' +
      '<img src="' + localUrl("assets/icons/favicon.svg") + '" alt="" width="38" height="38">' +
      '<span>' + data.brand.logo + '<span class="brand__tag">' + data.brand.descriptor + "</span></span></a>" +
      '<nav class="site-nav" id="primary-navigation" aria-label="Main navigation" aria-hidden="true" inert>' +
      '<ul class="site-nav__links">' + renderNavigation(data) + "</ul>" +
      '<div class="site-nav__actions">' +
      '<button class="icon-button theme-toggle" type="button" data-theme-toggle aria-pressed="false" aria-label="Toggle theme">' +
      '<svg class="theme-icon theme-icon--sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8"/></svg>' +
      '<svg class="theme-icon theme-icon--moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.8 8.8 0 1 0 20.5 15.2Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg></button>' +
      '<button class="icon-button direction-toggle" type="button" data-direction-toggle aria-pressed="false" aria-label="Switch to right-to-left layout" title="Switch layout direction">' +
      '<svg class="icon-dir" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h16m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>' +
      '<span data-direction-label>LTR</span></button>' +
      '<a class="btn-primary btn-primary--sm header-quote" href="' + pageUrl("price-enquiry.html") + '"><span data-i18n="quoteCta">Get Quote</span></a>' +
      "</div></nav>" +
      '<button class="icon-button nav-toggle" type="button" aria-label="' + data.i18n.en.openMenu + '" aria-expanded="false" aria-controls="primary-navigation" data-nav-toggle>' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg></button>' +
      "</div></header>" +
      '<button class="nav-backdrop" type="button" tabindex="-1" aria-hidden="true" aria-label="' + data.i18n.en.closeMenuOverlay + '" data-nav-close></button>' +
      '<div class="scroll-progress" aria-hidden="true"><div class="scroll-progress__bar" data-scroll-progress></div></div>';
  }

  function renderFooter(data) {
    const host = document.getElementById("site-footer");
    if (!host) return;

    const quickLinks = [
      { key: "navHomeMain", href: "index.html" },
      { key: "navHomeDetailed", href: "home-2.html" },
      { key: "navEnquiry", href: "price-enquiry.html" },
      { key: "navContact", href: "contact.html" }
    ];
    const productLinks = [
      { key: "navProducts", href: "products.html" },
      { key: "navGrade", href: "products-grade.html" },
      { key: "navSize", href: "products-size.html" }
    ];
    function footerLinks(links) {
      return links.map(function (item) {
        return '<li><a href="' + pageUrl(item.href) + '" data-i18n="' + item.key + '">' + data.i18n.en[item.key] + "</a></li>";
      }).join("");
    }

    const socials = data.socialLinks.map(function (item) {
      return '<a href="' + item.url + '" aria-label="' + data.i18n.en[item.key] + '" data-i18n-aria-label="' + item.key + '">' +
        icon(item.icon) + "</a>";
    }).join("");

    host.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="site-footer__grid">' +
      '<div class="site-footer__about"><a class="brand" href="' + localUrl("index.html") + '">' +
      '<img src="' + localUrl("assets/icons/favicon.svg") + '" alt="" width="38" height="38"><span>' + data.brand.logo +
      '<span class="brand__tag">' + data.brand.descriptor + "</span></span></a>" +
      '<p data-i18n="footerAbout">' + data.i18n.en.footerAbout + "</p></div>" +
      '<div><h2 class="site-footer__title" data-i18n="footerQuickTitle">' + data.i18n.en.footerQuickTitle +
      '</h2><ul class="site-footer__links">' + footerLinks(quickLinks) + "</ul></div>" +
      '<div><h2 class="site-footer__title" data-i18n="footerProductsTitle">' + data.i18n.en.footerProductsTitle +
      '</h2><ul class="site-footer__links">' + footerLinks(productLinks) + "</ul></div>" +
      '<div><h2 class="site-footer__title" data-i18n="footerContactTitle">' + data.i18n.en.footerContactTitle +
      '</h2><ul class="site-footer__links"><li><span class="footer-address">' + data.brand.address +
      '</span></li><li><a href="' + pageUrl("contact.html") + '" data-i18n="footerLocation">' + data.i18n.en.footerLocation +
      '</a></li><li><a href="tel:' + data.brand.phoneHref + '" dir="ltr"><bdi dir="ltr">' + data.brand.phone +
      "</bdi></a></li></ul><div class=\"social-links\" aria-label=\"" + data.i18n.en.socialLinks + "\" data-i18n-aria-label=\"socialLinks\">" + socials + "</div></div></div>" +
      '<div class="site-footer__bottom"><p>© <span data-footer-year>' + new Date().getFullYear() +
      '</span> ' + data.brand.name + '. <span data-i18n="footerCopyright">' + data.i18n.en.footerCopyright +
      '</span></p><a class="back-to-top" href="#top" aria-label="' + data.i18n.en.backToTop + '"><span class="icon-dir" aria-hidden="true">↑</span></a></div>' +
      "</div></footer>";
  }

  function showNotification(type, text) {
    let host = document.querySelector(".site-notifications");
    if (!host) {
      host = document.createElement("div");
      host.className = "site-notifications";
      host.setAttribute("aria-label", "Notifications");
      document.body.appendChild(host);
    }

    const notification = document.createElement("div");
    notification.className = "site-notification site-notification--" + type;
    notification.setAttribute("role", type === "warning" ? "alert" : "status");
    notification.setAttribute("aria-live", type === "warning" ? "assertive" : "polite");

    const iconMarkup = type === "warning"
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.7 20h18.6L12 3Z"/><path d="M12 9v5m0 3h.01"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
    const icon = document.createElement("span");
    icon.className = "site-notification__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = iconMarkup;

    const message = document.createElement("p");
    message.className = "site-notification__message";
    message.textContent = text;

    const close = document.createElement("button");
    close.className = "site-notification__close";
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss notification");
    close.textContent = "×";
    close.addEventListener("click", function () {
      notification.remove();
    });

    notification.append(icon, message, close);
    host.appendChild(notification);
    window.setTimeout(function () {
      notification.remove();
    }, 6000);
  }

  function initModules() {
    const data = window.SteelData;
    if (!data) {
      console.error("Shared site data is unavailable; the site shell could not be initialized.");
      return;
    }

    renderHeader(data);
    renderFooter(data);

    ["theme", "direction", "navigation", "scrollProgress", "products", "forms", "home2"].forEach(function (name) {
      if (modules[name] && typeof modules[name].init === "function") {
        modules[name].init();
      }
    });
  }

  window.SteelSiteNotify = showNotification;
  document.addEventListener("DOMContentLoaded", initModules, { once: true });

  // Global image error fallback: replace broken images with placeholder
  window.addEventListener("error", function (event) {
    if (event.target && event.target.tagName === "IMG") {
      const img = event.target;
      if (!img.dataset.hasFallback) {
        img.dataset.hasFallback = "true";
        img.src = inPagesDirectory ? "../images/placeholder.jpg" : "images/placeholder.jpg";
      }
    }
  }, true);

  root.dataset.siteBase = base;
}());
