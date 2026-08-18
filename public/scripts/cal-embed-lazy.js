/**
 * Lazy-load self-hosted Cal.com embed.js when a .cal-inline-widget is near the viewport.
 * Keeps the third-party script off the critical path for TBT.
 *
 * Also stamps booked_diagnostic=true in Customer.io when a booking completes,
 * using the email from sessionStorage (set by site forms) or Cal.com payload.
 * Posts to /api/booked (not /api/forms): keepalive + unload cannot run Turnstile,
 * so that path uses Origin / source_page only. /api/forms has zero Turnstile exemptions.
 */
(function () {
  var ORIGIN = "https://cal.wescalestartups.com";
  var SRC = ORIGIN + "/embed/embed.js";
  var EMAIL_KEY = "wss_lead_email";
  var STATUS_KEY = "wss_booking_status";
  var loaded = false;
  var bookedSent = false;
  var inited = false;

  var PENDING_STATUSES = {
    PENDING: true,
    AWAITING_HOST: true,
    UNCONFIRMED: true,
    BOOKING_REQUESTED: true
  };
  var CONFIRMED_STATUSES = { ACCEPTED: true, CONFIRMED: true };

  function asObject(value) {
    return value && typeof value === "object" ? value : null;
  }

  // Keep in sync with scripts/cal-booking-status.mjs
  function bookingStatusFromCalPayload(detail) {
    var root = asObject(detail);
    if (!root) return "";
    var data = asObject(root.data) || asObject(root.booking) || root;
    var nested = asObject(data.booking) || data;
    var raw = String(nested.status || nested.bookingStatus || data.status || root.status || "").toUpperCase();
    if (PENDING_STATUSES[raw]) return "pending";
    if (CONFIRMED_STATUSES[raw]) return "confirmed";
    if (nested.requiresConfirmation === true || data.requiresConfirmation === true || root.requiresConfirmation === true) {
      return "pending";
    }
    if (nested.confirmed === false || data.confirmed === false) return "pending";
    if (nested.isPending === true || data.isPending === true) return "pending";
    if (nested.confirmed === true || data.confirmed === true) return "confirmed";
    return "";
  }

  function rememberBookingStatus(detail) {
    var status = bookingStatusFromCalPayload(detail);
    if (!status) return;
    try {
      sessionStorage.setItem(STATUS_KEY, status);
    } catch (_) {}
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

  function emailFromCalPayload(detail) {
    if (!detail || typeof detail !== "object") return "";
    var data = detail.data || detail;
    if (typeof data.email === "string") return data.email;
    if (data.attendees && data.attendees[0] && typeof data.attendees[0].email === "string") {
      return data.attendees[0].email;
    }
    if (data.booking && data.booking.attendees && data.booking.attendees[0]) {
      return data.booking.attendees[0].email || "";
    }
    return "";
  }

  function markBookedDiagnostic(email, source) {
    if (bookedSent || !email) return;
    bookedSent = true;
    rememberEmail(email);
    try {
      fetch("/api/booked", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email,
          form_id: "wss-newsletter",
          source_page: window.location.href,
          lead_magnet: source || "calcom-booking"
        })
      }).catch(function () {});
    } catch (_) {}
  }

  function pushDataLayer(eventName, source) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      booking_source: source,
      page_path: window.location.pathname
    });
  }

  function onCalMessage(e) {
    if (e.origin !== ORIGIN) return;
    var data = e.data;
    if (!data || typeof data !== "object") return;

    // Embed API style: { originator: "CAL", method, ... }
    var action = data.method || data.action || data.type || "";
    var detail = data.arg || data.data || data.payload || data;

    if (action === "bookingSuccessfulV2" || action === "bookingSuccessful" || action === "booked") {
      rememberBookingStatus(detail);
      var email = (emailFromCalPayload(detail) || rememberedEmail() || "").trim();
      markBookedDiagnostic(email, "calcom-booking");
      pushDataLayer("booking_completed", "calcom_inline");
      return;
    }

    if (action === "eventTypeSelected" || action === "slotSelected" || action === "dateSelected") {
      pushDataLayer("booking_time_selected", "calcom_inline");
    }
  }

  window.addEventListener("message", onCalMessage);

  function ensureCalLoader() {
    if (window.Cal && window.Cal.loaded) return;
    (function (C, A, L) {
      var p = function (a, ar) {
        a.q.push(ar);
      };
      var d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          var cal = C.Cal;
          var ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            var api = function () {
              p(api, arguments);
            };
            var namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, SRC, "init");
  }

  function initWidgets() {
    if (inited) return;
    var nodes = document.querySelectorAll(".cal-inline-widget[data-cal-link]");
    if (!nodes.length) return;
    inited = true;
    ensureCalLoader();
    window.Cal("init", { origin: ORIGIN });

    nodes.forEach(function (node, index) {
      var calLink = node.getAttribute("data-cal-link");
      if (!calLink) return;
      if (!node.id) node.id = "cal-inline-" + index;
      var ns = "inline" + index;
      window.Cal("init", ns, { origin: ORIGIN });
      window.Cal.ns[ns]("inline", {
        elementOrSelector: "#" + node.id,
        calLink: calLink,
        config: {
          layout: node.getAttribute("data-cal-layout") || "month_view",
          theme: node.getAttribute("data-cal-theme") || "light"
        }
      });
      window.Cal.ns[ns]("on", {
        action: "bookingSuccessfulV2",
        callback: function (e) {
          rememberBookingStatus(e && e.detail);
          var email = (emailFromCalPayload(e && e.detail) || rememberedEmail() || "").trim();
          markBookedDiagnostic(email, "calcom-booking");
          pushDataLayer("booking_completed", "calcom_inline");
        }
      });
    });
  }

  function loadWhenVisible() {
    var nodes = document.querySelectorAll(".cal-inline-widget");
    if (!nodes.length) return;

    function start() {
      if (loaded) return;
      loaded = true;
      initWidgets();
    }

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            start();
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

  window.wssRememberLeadEmail = rememberEmail;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadWhenVisible);
  } else {
    loadWhenVisible();
  }
})();
