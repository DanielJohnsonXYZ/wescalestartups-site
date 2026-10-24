import test from "node:test";
import assert from "node:assert/strict";
import { onRequestPost as contact } from "../functions/api/contact.js";
import { onRequestPost as signup } from "../functions/api/forms.js";

const valid = {
  name: "Site test", email: "test@example.org", company: "Example Ltd",
  stage: "Series A", arr: "£1m to £5m", budget: "Exploring",
  bottleneck: "Need a better process", channels: "SEO", timeline: "Next quarter",
  source_page: "https://wescalestartups.com/contact"
};

function context(payload, env = {}, origin = "https://wescalestartups.com") {
  return {
    env,
    request: new Request("https://wescalestartups.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        Referer: "https://wescalestartups.com/contact"
      },
      body: JSON.stringify(payload)
    })
  };
}

test("contact: only Resend-confirmed delivery is success, full enquiry included", async () => {
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({url, options});
    return new Response(JSON.stringify({id: "email_test"}), {status: 200});
  };
  try {
    const res = await contact(context(valid, {RESEND_API_KEY: "re_test"}));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), {ok: true, delivered: true});
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://api.resend.com/emails");
    const email = JSON.parse(calls[0].options.body);
    assert.deepEqual(email.to, ["daniel@wescalestartups.com"]);
    assert.equal(email.reply_to, "test@example.org");
    assert.match(email.text, /Need a better process/);
    assert.match(email.text, /Example Ltd/);
  } finally { globalThis.fetch = previous; }
});

test("contact: missing mail config does not claim delivery", async () => {
  const res = await contact(context(valid));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).ok, false);
});

test("contact: foreign origin rejected", async () => {
  const res = await contact(context(valid, {RESEND_API_KEY:"re_test"}, "https://spam.example"));
  assert.equal(res.status, 403);
  assert.equal((await res.json()).ok, false);
});

test("contact: validation catches bad email", async () => {
  const res = await contact(context({...valid, email:"bad"}, {RESEND_API_KEY:"re_test"}));
  assert.equal(res.status, 400);
  assert.equal((await res.json()).ok, false);
});

test("contact: Resend errors never claim success", async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async () => new Response("not accepted", {status: 403});
  try {
    const res = await contact(context(valid, {RESEND_API_KEY:"re_test"}));
    assert.equal(res.status, 503);
    assert.equal((await res.json()).ok, false);
  } finally {globalThis.fetch = previous;}
});

test("contact: enforced Turnstile rejects missing token", async () => {
  const res = await contact(context(valid, {
    RESEND_API_KEY:"re_test", TURNSTILE_ENFORCE:"1", TURNSTILE_SECRET_KEY:"test"
  }));
  assert.equal(res.status, 403);
  assert.equal((await res.json()).ok, false);
});

test("newsletter: guard rejection never reports success", async () => {
  const res = await signup(context({
    email:"test@example.org",source_page:"https://wescalestartups.com/"
  }, {}, "https://spam.example"));
  assert.equal(res.status, 403);
  assert.equal((await res.json()).ok, false);
});