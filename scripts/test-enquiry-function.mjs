import assert from "node:assert/strict";
import { onRequest } from "../functions/api/enquiry.js";

const validPayload = {
  formId: "growth-enquiry",
  page: "https://wescalestartups.com/contact",
  fields: {
    name: "Audit User",
    email: "audit@example.com",
    company: "Audit Company",
    stage: "Series A",
    arr: "£1m to £5m",
    bottleneck: "Test submission",
    budget: "£5k to £10k"
  }
};

function contextFor(payload, env = {}, origin = "https://wescalestartups.com") {
  const pending = [];
  return {
    request: new Request("https://wescalestartups.com/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: origin },
      body: JSON.stringify(payload)
    }),
    env,
    waitUntil(promise) { pending.push(promise); },
    pending
  };
}

async function responseBody(response) {
  return { status: response.status, body: await response.json() };
}

{
  const stored = [];
  const context = contextFor(validPayload, {
    LEADS: {
      async put(key, value, options) { stored.push({ key, value: JSON.parse(value), options }); }
    }
  });
  const result = await responseBody(await onRequest(context));
  assert.equal(result.status, 202);
  assert.equal(result.body.ok, true);
  assert.match(result.body.submissionId, /^[0-9a-f-]{36}$/i);
  assert.equal(stored.length, 1);
  assert.equal(stored[0].value.fields.bottleneck, "Test submission");
  assert.equal(stored[0].options.expirationTtl, 90 * 86400);
  await Promise.all(context.pending);
}

{
  const invalid = structuredClone(validPayload);
  delete invalid.fields.email;
  const result = await responseBody(await onRequest(contextFor(invalid, { LEADS: { put() {} } })));
  assert.equal(result.status, 422);
  assert.equal(result.body.fields.email, "required");
}

{
  const result = await responseBody(await onRequest(contextFor(validPayload)));
  assert.equal(result.status, 503);
  assert.equal(result.body.error, "storage_unavailable");
}

{
  const result = await responseBody(await onRequest(contextFor(validPayload, {}, "https://attacker.example")));
  assert.equal(result.status, 403);
  assert.equal(result.body.error, "origin_not_allowed");
}

{
  const bot = { ...validPayload, _website: "spam.example" };
  const result = await responseBody(await onRequest(contextFor(bot)));
  assert.equal(result.status, 202);
  assert.equal(result.body.ok, true);
}

console.log("enquiry function tests passed");
