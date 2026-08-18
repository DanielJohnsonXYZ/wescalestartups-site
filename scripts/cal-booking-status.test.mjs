import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bookingStatusFromCalPayload,
  thanksBookingState,
  thanksRedirectPath
} from "./cal-booking-status.mjs";

describe("bookingStatusFromCalPayload", () => {
  it("treats PENDING and confirmation-required payloads as pending", () => {
    assert.equal(bookingStatusFromCalPayload({ status: "PENDING" }), "pending");
    assert.equal(bookingStatusFromCalPayload({ data: { status: "AWAITING_HOST" } }), "pending");
    assert.equal(bookingStatusFromCalPayload({ booking: { status: "UNCONFIRMED" } }), "pending");
    assert.equal(bookingStatusFromCalPayload({ requiresConfirmation: true }), "pending");
    assert.equal(bookingStatusFromCalPayload({ confirmed: false }), "pending");
    assert.equal(bookingStatusFromCalPayload({ data: { isPending: true } }), "pending");
  });

  it("treats ACCEPTED and confirmed payloads as confirmed", () => {
    assert.equal(bookingStatusFromCalPayload({ status: "ACCEPTED" }), "confirmed");
    assert.equal(bookingStatusFromCalPayload({ data: { bookingStatus: "CONFIRMED" } }), "confirmed");
    assert.equal(bookingStatusFromCalPayload({ confirmed: true }), "confirmed");
  });

  it("returns empty when the payload has no status signal", () => {
    assert.equal(bookingStatusFromCalPayload(null), "");
    assert.equal(bookingStatusFromCalPayload({ uid: "abc" }), "");
  });
});

describe("thanksBookingState", () => {
  it("prefers explicit query params over stored status", () => {
    assert.equal(
      thanksBookingState({ search: "?status=pending", storedStatus: "confirmed" }),
      "pending"
    );
    assert.equal(
      thanksBookingState({ search: "confirmed=1", storedStatus: "pending" }),
      "confirmed"
    );
  });

  it("falls back to stored status, then the host-confirmation default", () => {
    assert.equal(thanksBookingState({ storedStatus: "confirmed" }), "confirmed");
    assert.equal(thanksBookingState({ requiresHostConfirmation: true }), "pending");
    assert.equal(thanksBookingState({ requiresHostConfirmation: false }), "confirmed");
  });
});

describe("thanksRedirectPath", () => {
  it("passes status on the thanks URL so the page does not claim a calendar event too early", () => {
    assert.equal(thanksRedirectPath("pending"), "/book/thanks?status=pending");
    assert.equal(thanksRedirectPath("confirmed"), "/book/thanks?status=confirmed");
    assert.equal(thanksRedirectPath(""), "/book/thanks");
  });
});
