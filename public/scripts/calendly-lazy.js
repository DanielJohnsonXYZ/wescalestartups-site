/**
 * Lazy-load Calendly widget.js when a .calendly-inline-widget is near the viewport.
 * Keeps the third-party script off the critical path for TBT.
 * Include once per page that embeds Calendly (after the widget mount nodes).
 *
 * Also stamps booked_diagnostic=true in Customer.io when a booking completes,
 * using the email from sessionStorage (set by site forms) or Calendly payload.
 */
(function () {
  var SRC = "https://assets.calendly.com/assets/external/widget.js";
  var EMAIL_KEY = "wss_lead_email";
  var loaded = false;
  var bookedSent = false;

  function loadCalendly() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    document.head.appendChild(s);
  }

  function rememberEmail(email) {
    if (!email || typeof email !== "string") return;
    var cleaned = email.trim().toLowerCase();
    if (!cleaned || cleaned.indexOf("@") < 1) return;
    try {
      sessionStorage.setItem(EMAIL_KEY, cleaned);
    } catch (_) {}
  }

  function rememberedEmail() {
    try {
      return (sessionStorage.getItem(EMAIL_KEY) || "").trim();
    } catch (_) {
      return "";
    }
  }

  function emailFromCalendlyPayload(payload) {
    if (!payload || typeof payload !== "object") return "";
    var invitee = payload.invitee || {};
    if (typeof invitee.email === "string") return invitee.email;
    if (invitee && invitee.email && typeof invitee.email === "object" && invitee.email.address) {
      return invitee.email.address;
    }
    return "";
  }

  function markBookedDiagnostic(email, source) {
    if (bookedSent || !email) return;
    bookedSent = true;
    rememberEmail(email);
    try {
      fetch("/api/forms", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email,
          form_id: "wss-newsletter",
          booked_diagnostic: "true",
          source_page: window.location.href,
          lead_magnet: source || "calendly-booking"
        })
      }).catch(function () {});
    } catch (_) {}
  }

  function isCalendlyEvent(e) {
    return (
      e.origin === "https://calendly.com" &&
      e.data &&
      typeof e.data.event === "string" &&
      e.data.event.indexOf("calendly.") === 0
    );
  }

  window.addEventListener("message", function (e) {
    if (!isCalendlyEvent(e)) return;
    if (e.data.event !== "calendly.event_scheduled") return;
    var fromPayload = emailFromCalendlyPayload(e.data.payload);
    var email = (fromPayload || rememberedEmail() || "").trim();
    markBookedDiagnostic(email, "calendly-booking");
  });

  // Expose so form scripts can remember the lead email before they book.
  window.wssRememberLeadEmail = rememberEmail;

  function observe() {
    var nodes = document.querySelectorAll(".calendly-inline-widget");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window)) {
      loadCalendly();
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            loadCalendly();
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "240px 0px" }
    );

    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observe);
  } else {
    observe();
  }
})();
