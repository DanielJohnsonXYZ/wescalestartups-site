(function () {
  const forms = document.querySelectorAll("form[data-wss-enquiry]");
  window.__wssEnquiryFormsReady = forms.length;

  function pushEvent(event, form, extra) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      form_id: form.id || form.name || "unknown",
      page_path: window.location.pathname,
      ...extra
    });
  }

  function statusNode(form) {
    const selector = form.dataset.statusTarget;
    let node = selector ? document.querySelector(selector) : form.querySelector("[data-form-status]");
    if (!node) {
      node = document.createElement("div");
      node.setAttribute("data-form-status", "");
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      node.className = "form-status";
      form.appendChild(node);
    }
    return node;
  }

  function showStatus(form, kind, message) {
    const node = statusNode(form);
    node.hidden = false;
    node.dataset.state = kind;
    node.replaceChildren();
    const text = document.createElement("span");
    text.textContent = message;
    node.appendChild(text);
    if (kind === "error" && form.dataset.fallbackEmail) {
      node.appendChild(document.createTextNode(" "));
      const link = document.createElement("a");
      link.href = `mailto:${form.dataset.fallbackEmail}`;
      link.textContent = `Email ${form.dataset.fallbackEmail} instead`;
      node.appendChild(link);
      node.setAttribute("role", "alert");
    } else {
      node.setAttribute("role", "status");
    }
  }

  forms.forEach((form) => {
    let started = false;
    form.addEventListener("input", () => {
      if (started) return;
      started = true;
      pushEvent("form_start", form, {});
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const submit = form.querySelector('[type="submit"]');
      const originalLabel = submit?.textContent;
      if (submit) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        submit.textContent = "Sending…";
      }
      showStatus(form, "pending", "Sending your information securely…");

      const data = new FormData(form);
      const fields = {};
      data.forEach((value, key) => {
        if (key !== "_website" && typeof value === "string") fields[key] = value;
      });

      try {
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            formId: form.id || form.name,
            page: window.location.href,
            _website: data.get("_website") || "",
            fields
          })
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok || !result.submissionId) throw new Error(result.error || "submission_failed");

        showStatus(form, "success", `Thanks — your information was received. Reference: ${result.submissionId}`);
        pushEvent("form_submit", form, {});
        form.reset();
        started = false;
      } catch (error) {
        showStatus(form, "error", "We could not safely store this submission. Nothing has been marked as sent.");
        pushEvent("form_error", form, { error_code: error instanceof Error ? error.message : "submission_failed" });
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
          submit.textContent = originalLabel;
        }
      }
    });
  });
})();
