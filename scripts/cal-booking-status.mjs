/**
 * Shared booking-status helpers for the Cal.com embed and /book/thanks.
 * Keep the copies in public/scripts/cal-embed-lazy.js and the thanks page
 * in sync with these rules.
 */

export const BOOKING_STATUS_STORAGE_KEY = "wss_booking_status";

const PENDING_STATUSES = new Set(["PENDING", "AWAITING_HOST", "UNCONFIRMED", "BOOKING_REQUESTED"]);
const CONFIRMED_STATUSES = new Set(["ACCEPTED", "CONFIRMED"]);

function asObject(value) {
  return value && typeof value === "object" ? value : null;
}

export function bookingStatusFromCalPayload(detail) {
  const root = asObject(detail);
  if (!root) return "";
  const data = asObject(root.data) || asObject(root.booking) || root;
  const nested = asObject(data.booking) || data;
  const raw = String(nested.status || nested.bookingStatus || data.status || root.status || "").toUpperCase();

  if (PENDING_STATUSES.has(raw)) return "pending";
  if (CONFIRMED_STATUSES.has(raw)) return "confirmed";
  if (nested.requiresConfirmation === true || data.requiresConfirmation === true || root.requiresConfirmation === true) {
    return "pending";
  }
  if (nested.confirmed === false || data.confirmed === false) return "pending";
  if (nested.isPending === true || data.isPending === true) return "pending";
  if (nested.confirmed === true || data.confirmed === true) return "confirmed";
  return "";
}

export function thanksBookingState({
  search = "",
  storedStatus = "",
  requiresHostConfirmation = true
} = {}) {
  const query = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(query);
  const qStatus = (params.get("status") || "").toLowerCase();
  if (params.get("pending") === "1" || qStatus === "pending") return "pending";
  if (params.get("confirmed") === "1" || qStatus === "confirmed" || qStatus === "accepted") {
    return "confirmed";
  }
  if (storedStatus === "pending" || storedStatus === "confirmed") return storedStatus;
  return requiresHostConfirmation ? "pending" : "confirmed";
}

export function thanksRedirectPath(storedStatus) {
  if (storedStatus === "pending") return "/book/thanks?status=pending";
  if (storedStatus === "confirmed") return "/book/thanks?status=confirmed";
  return "/book/thanks";
}
