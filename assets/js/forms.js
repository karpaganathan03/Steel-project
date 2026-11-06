(function () {
  "use strict";

  const modules = window.SteelSiteModules = window.SteelSiteModules || {};
  const storageKey = "forgeline-enquiries";
  const istDateFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const istDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  function strings() {
    return window.SteelData && window.SteelData.i18n.en;
  }

  function isValidName(value) {
    return Array.from(value.matchAll(/\p{L}/gu)).length >= 4 &&
      /^\p{L}+(?: \p{L}+)*$/u.test(value);
  }

  function isValidPhone(value) {
    return /^\d{10}$/.test(value);
  }

  function isValidEmail(value) {
    return /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,}$/i.test(value);
  }

  function getISTParts(formatter, date) {
    return formatter.formatToParts(date).reduce(function (parts, item) {
      if (item.type !== "literal") parts[item.type] = item.value;
      return parts;
    }, {});
  }

  function getISTDate(date) {
    const parts = getISTParts(istDateFormatter, date || new Date());
    return parts.year + "-" + parts.month + "-" + parts.day;
  }

  function getISTTimestamp() {
    const parts = getISTParts(istDateTimeFormatter, new Date());
    return parts.year + "-" + parts.month + "-" + parts.day + "T" +
      parts.hour + ":" + parts.minute + ":" + parts.second + "+05:30";
  }

  function refreshDateMinimum(control) {
    control.min = getISTDate();
  }

  function scheduleISTDateRefresh(control, validate) {
    function scheduleNextMidnight() {
      const currentDate = getISTDate();
      const nextDate = new Date(Date.UTC(
        Number(currentDate.slice(0, 4)),
        Number(currentDate.slice(5, 7)) - 1,
        Number(currentDate.slice(8, 10)) + 1
      ));
      const nextMidnightUtc = nextDate.getTime() - (5.5 * 60 * 60 * 1000);
      window.setTimeout(function () {
        refreshDateMinimum(control);
        if (control.value && !validate()) {
          notify("warning", "Delivery date must be today or a future date in Indian Standard Time.");
        }
        scheduleNextMidnight();
      }, Math.max(1000, nextMidnightUtc - Date.now() + 100));
    }

    refreshDateMinimum(control);
    if (control.value && !validate()) {
      notify("warning", "Delivery date must be today or a future date in Indian Standard Time.");
    }
    control.addEventListener("focus", function () {
      refreshDateMinimum(control);
    });
    control.addEventListener("input", function () {
      refreshDateMinimum(control);
      validate();
    });
    control.addEventListener("change", function () {
      refreshDateMinimum(control);
      if (!validate()) {
        notify("warning", "Delivery date must be today or a future date in Indian Standard Time.");
      }
    });
    scheduleNextMidnight();
  }

  function notify(type, text) {
    if (typeof window.SteelSiteNotify === "function") {
      window.SteelSiteNotify(type, text);
    }
  }

  function init() {
    initEnquiryForm();
    initLocalContactForm();
  }

  function initLocalContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const submitButton = form.querySelector("[type='submit']");
    const submitLabel = form.querySelector("[data-submit-label]");
    const spinner = form.querySelector(".form-spinner");
    const status = form.querySelector("[data-form-status]");
    const success = document.querySelector("[data-contact-success]");
    const originalLabel = submitLabel ? submitLabel.textContent : "";
    let submitAttempted = false;

    function message(key) {
      const dictionary = strings();
      return dictionary && dictionary[key] ? dictionary[key] : key;
    }

    function validate(control) {
      const type = control.dataset.validate;
      const rawValue = String(control.value || "");
      const value = type === "phone" ? rawValue : rawValue.trim();
      let errorKey = "";
      if (type === "name" && !isValidName(value)) errorKey = "contactValidationName";
      else if (type === "phone" && !isValidPhone(value)) errorKey = "contactValidationPhone";
      else if (type === "email" && !isValidEmail(value)) errorKey = "contactValidationEmail";
      else if (type === "subject" && !value) errorKey = "contactValidationSubject";
      else if (type === "message" && !value) errorKey = "contactValidationMessage";

      const wrapper = control.closest(".form-field");
      const error = form.querySelector("[data-field-error='" + type + "']");
      if (wrapper) wrapper.classList.toggle("form-field--error", Boolean(errorKey));
      control.setAttribute("aria-invalid", String(Boolean(errorKey)));
      if (error) {
        error.textContent = errorKey ? message(errorKey) : "";
        error.hidden = !errorKey;
      }
      return !errorKey;
    }

    function saveMessage() {
      const formData = new FormData(form);
      const record = {
        formType: "contact",
        submittedAt: getISTTimestamp(),
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      let records;
      try {
        const stored = window.localStorage.getItem("forgeline-contact-messages");
        records = stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Contact message could not be read from local storage.", error);
        if (status) status.textContent = message("contactStorageError");
        notify("warning", message("contactStorageError"));
        return false;
      }
      if (!Array.isArray(records)) {
        console.error("Stored contact messages are not a valid list.");
        if (status) status.textContent = message("contactStorageError");
        notify("warning", message("contactStorageError"));
        return false;
      }

      records.push(record);
      try {
        window.localStorage.setItem("forgeline-contact-messages", JSON.stringify(records));
      } catch (error) {
        console.error("Contact message could not be saved to local storage.", error);
        if (status) status.textContent = message("contactStorageError");
        notify("warning", message("contactStorageError"));
        return false;
      }
      return true;
    }

    form.querySelectorAll("[data-validate]").forEach(function (control) {
      control.addEventListener("blur", function () {
        if (control.type !== "tel") control.value = control.value.trim();
        validate(control);
      });
      control.addEventListener("input", function () {
        if (submitAttempted || control.getAttribute("aria-invalid") === "true") validate(control);
      });
      control.addEventListener("change", function () {
        if (submitAttempted || control.getAttribute("aria-invalid") === "true") validate(control);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitButton && submitButton.disabled) return;
      form.querySelectorAll("[name]").forEach(function (control) {
        if (control.type !== "submit" && control.type !== "tel") control.value = control.value.trim();
      });
      submitAttempted = true;
      const controls = Array.from(form.querySelectorAll("[data-validate]"));
      const invalid = controls.filter(function (control) { return !validate(control); });
      if (invalid.length) {
        if (status) status.textContent = "";
        notify("warning", "Please correct the highlighted fields before sending your message.");
        invalid[0].focus();
        return;
      }

      if (status) status.textContent = "";
      if (submitButton) submitButton.disabled = true;
      if (spinner) spinner.hidden = false;
      if (submitLabel) submitLabel.textContent = message("contactSaving");
      form.classList.add("is-saving");

      window.setTimeout(function () {
        if (submitButton) submitButton.disabled = false;
        if (spinner) spinner.hidden = true;
        if (submitLabel) submitLabel.textContent = originalLabel;
        form.classList.remove("is-saving");
        if (!saveMessage()) return;
        notify("success", "Your message has been saved in this browser.");
        form.hidden = true;
        if (success) {
          success.hidden = false;
          const heading = success.querySelector("h3");
          if (heading) {
            heading.tabIndex = -1;
            heading.focus();
          }
        }
      }, 600);
    });
  }

  function initEnquiryForm() {
    const form = document.querySelector("[data-enquiry-form]");
    if (!form) return;

    const submitButton = form.querySelector("[type='submit']");
    const submitLabel = form.querySelector("[data-submit-label]");
    const spinner = form.querySelector(".form-spinner");
    const status = form.querySelector("[data-form-status]");
    const success = document.querySelector("[data-enquiry-success]");
    const fieldset = form.querySelector("[data-size-group]");
    const deliveryDate = form.querySelector("[name='deliveryDate']");
    const sizeInputs = fieldset ? Array.from(fieldset.querySelectorAll("[name='size']")) : [];
    let submitLabelOriginal = submitLabel ? submitLabel.textContent : "";
    let submitAttempted = false;

    function message(key) {
      const dictionary = strings();
      return dictionary && dictionary[key] ? dictionary[key] : key;
    }

    function targetKey(target) {
      return target.matches("[data-size-group]") ? "size" : target.dataset.validate;
    }

    function targetControl(target) {
      if (target.matches("[data-size-group]")) return target.querySelector("[name='size']");
      return target;
    }

    function fieldError(target) {
      const key = targetKey(target);
      return form.querySelector("[data-field-error='" + key + "']");
    }

    function setError(target, messageKey) {
      const error = fieldError(target);
      const control = targetControl(target);
      const wrapper = target.matches("[data-size-group]") ? target : target.closest(".form-field");
      if (wrapper) wrapper.classList.toggle("form-field--error", Boolean(messageKey));
      if (control) control.setAttribute("aria-invalid", String(Boolean(messageKey)));
      if (target.matches("[data-size-group]")) {
        target.setAttribute("aria-invalid", String(Boolean(messageKey)));
      } else if (target.name === "consent") {
        const label = form.querySelector("label[for='enquiry-consent']");
        if (label) label.setAttribute("aria-invalid", String(Boolean(messageKey)));
      }
      if (error) {
        error.textContent = messageKey ? message(messageKey) : "";
        error.hidden = !messageKey;
      }
      return !messageKey;
    }

    function validate(target) {
      const key = targetKey(target);
      if (key === "size") {
        return setError(target, sizeInputs.some(function (input) { return input.checked; })
          ? ""
          : "enquiryValidationSize");
      }

      const rawValue = String(target.value || "");
      const value = key === "phone" ? rawValue : rawValue.trim();
      if (key === "name" && !isValidName(value)) return setError(target, "enquiryValidationName");
      if (key === "phone" && !isValidPhone(value)) {
        return setError(target, "enquiryValidationPhone");
      }
      if (key === "email" && !isValidEmail(value)) {
        return setError(target, "enquiryValidationEmail");
      }
      if (key === "deliveryDate" && value && value < getISTDate()) {
        return setError(target, "enquiryValidationDate");
      }
      if (key === "product" && !value) return setError(target, "enquiryValidationProduct");
      if (key === "quantity" && (!value || !Number.isFinite(Number(value)) || Number(value) <= 0)) {
        return setError(target, "enquiryValidationQuantity");
      }
      if (key === "consent" && !target.checked) {
        return setError(target, "enquiryValidationConsent");
      }
      return setError(target, "");
    }

    function trimValues() {
      form.querySelectorAll("[name]").forEach(function (control) {
        if (control.type === "checkbox" || control.type === "radio" || control.type === "date" || control.type === "tel") return;
        if (control.tagName === "SELECT") return;
        control.value = control.value.trim();
      });
    }

    function showStorageError(error) {
      console.error("Enquiry could not be stored in local storage.", error);
      if (status) status.textContent = message("enquiryStorageError");
      notify("warning", message("enquiryStorageError"));
    }

    function saveEnquiry() {
      const formData = new FormData(form);
      const enquiry = {
        submittedAt: getISTTimestamp(),
        name: String(formData.get("name") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        product: String(formData.get("product") || ""),
        grade: String(formData.get("grade") || ""),
        sizes: formData.getAll("size").map(function (size) { return String(size); }),
        quantityTonnes: Number(formData.get("quantity")),
        deliveryDate: String(formData.get("deliveryDate") || ""),
        message: String(formData.get("message") || "").trim(),
        consent: true
      };

      let existing;
      try {
        const stored = window.localStorage.getItem(storageKey);
        existing = stored ? JSON.parse(stored) : [];
      } catch (error) {
        showStorageError(error);
        return false;
      }

      if (!Array.isArray(existing)) {
        showStorageError(new Error("Stored enquiries are not a valid list."));
        return false;
      }

      existing.push(enquiry);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(existing));
      } catch (error) {
        showStorageError(error);
        return false;
      }
      return true;
    }

    function resetButton() {
      if (submitButton) submitButton.disabled = false;
      if (spinner) spinner.hidden = true;
      if (submitLabel) submitLabel.textContent = submitLabelOriginal;
      form.classList.remove("is-saving");
    }

    function prefillFromQuery() {
      const params = new URLSearchParams(window.location.search);
      let unmatched = false;
      ["grade", "product"].forEach(function (name) {
        const control = form.elements.namedItem(name);
        const requested = params.get(name);
        if (!control || !requested) return;
        const option = Array.from(control.options).find(function (item) {
          return item.value === requested || item.textContent.trim() === requested;
        });
        if (option) control.value = option.value;
        else unmatched = true;
      });

      const requestedSizes = params.getAll("size").flatMap(function (value) {
        return value.split(",").map(function (size) { return size.trim(); }).filter(Boolean);
      });
      requestedSizes.forEach(function (size) {
        const checkbox = sizeInputs.find(function (input) {
          return input.value.toLowerCase() === size.toLowerCase();
        });
        if (checkbox) checkbox.checked = true;
        else unmatched = true;
      });

      if (unmatched && status) status.textContent = message("enquiryPrefillUnavailable");
    }

    form.querySelectorAll("[data-validate]").forEach(function (control) {
      control.addEventListener("blur", function () {
        if (control.value && control.type !== "checkbox" && control.type !== "tel") control.value = control.value.trim();
        validate(control);
      });
      control.addEventListener("input", function () {
        if (submitAttempted || control.getAttribute("aria-invalid") === "true") validate(control);
      });
      control.addEventListener("change", function () {
        if (submitAttempted || control.getAttribute("aria-invalid") === "true") validate(control);
      });
    });

    if (deliveryDate) {
      scheduleISTDateRefresh(deliveryDate, function () {
        return submitAttempted || deliveryDate.value ? validate(deliveryDate) : true;
      });
    }

    sizeInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        if (submitAttempted || fieldset.getAttribute("aria-invalid") === "true") validate(fieldset);
      });
    });
    if (fieldset) {
      fieldset.addEventListener("focusout", function (event) {
        if (!fieldset.contains(event.relatedTarget)) validate(fieldset);
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitButton && submitButton.disabled) return;
      trimValues();
      submitAttempted = true;
      const targets = Array.from(form.querySelectorAll("[data-validate], [data-size-group]"));
      const invalid = targets.filter(function (target) { return !validate(target); });
      if (invalid.length) {
        notify("warning", invalid.some(function (target) {
          return target.dataset.validate === "deliveryDate";
        })
          ? message("enquiryValidationDate")
          : "Please correct the highlighted fields before submitting your enquiry.");
        if (status) status.textContent = "";
        targetControl(invalid[0]).focus();
        return;
      }

      if (status) status.textContent = "";
      submitLabelOriginal = submitLabel ? submitLabel.textContent : submitLabelOriginal;
      if (submitButton) submitButton.disabled = true;
      if (spinner) spinner.hidden = false;
      if (submitLabel) submitLabel.textContent = message("enquirySaving");
      form.classList.add("is-saving");

      window.setTimeout(function () {
        resetButton();
        if (!saveEnquiry()) return;
        notify("success", "Your enquiry has been saved in this browser.");
        form.hidden = true;
        if (success) {
          success.hidden = false;
          const heading = success.querySelector("h3");
          if (heading) {
            heading.tabIndex = -1;
            heading.focus();
          }
        }
      }, 600);
    });

    prefillFromQuery();
  }

  modules.forms = { init: init };
}());
