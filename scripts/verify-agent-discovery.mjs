/**
 * Post-deploy checks for agent discovery (Link headers, markdown negotiation, well-known).
 * Usage: AGENT_BASE_URL=https://wescalestartups.com node scripts/verify-agent-discovery.mjs
 */
const base = (process.env.AGENT_BASE_URL || "https://wescalestartups.com").replace(/\/$/, "");

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

const check = (ok, msg) => {
  if (!ok) fail(msg);
};

async function head(path, init = {}) {
  return fetch(`${base}${path}`, { method: "HEAD", redirect: "follow", ...init });
}

async function getJson(path) {
  const r = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!r.ok) return { ok: false, status: r.status, data: null };
  try {
    return { ok: true, status: r.status, data: await r.json() };
  } catch {
    return { ok: false, status: r.status, data: null };
  }
}

async function main() {
  console.log(`Agent discovery checks against ${base}\n`);

  const api = await getJson("/.well-known/api-catalog");
  check(api.ok && api.data && Array.isArray(api.data.linkset), "GET /.well-known/api-catalog should return JSON with linkset[]");

  const skills = await getJson("/.well-known/agent-skills/index.json");
  check(skills.ok && skills.data && Array.isArray(skills.data.skills), "GET /.well-known/agent-skills/index.json should return JSON with skills[]");

  const mdMirror = await head("/markdown/home.md");
  check(mdMirror.ok, `HEAD /markdown/home.md should be 2xx (got ${mdMirror.status})`);
  const mdType = mdMirror.headers.get("content-type") || "";
  check(
    /markdown|text\/plain/i.test(mdType),
    `Expected markdown-ish Content-Type for /markdown/home.md; got ${mdType || "(none)"}`
  );

  const mdHome = await head("/", { headers: { Accept: "text/markdown" } });
  const ct = mdHome.headers.get("content-type") || "";
  const vary = mdHome.headers.get("vary") || "";
  if (!/markdown/i.test(ct)) {
    console.warn(
      "WARN: HEAD / with Accept: text/markdown did not return text/markdown.\n" +
        `        Content-Type: ${ct || "(none)"}\n` +
        "        After deploy, purge Cloudflare cache for / . Middleware uses env.ASSETS.fetch for the markdown file."
    );
  } else {
    console.log("OK: / with Accept: text/markdown returns text/markdown.");
  }
  if (!/accept/i.test(vary)) {
    console.warn(`WARN: Expected Vary to mention Accept on / ; got: ${vary || "(none)"}`);
  } else {
    console.log(`OK: Vary on negotiated homepage: ${vary}`);
  }

  const htmlHome = await head("/", { headers: { Accept: "text/html" } });
  const linkHtml = htmlHome.headers.get("link");
  if (!linkHtml || !/llms\.txt/i.test(linkHtml)) {
    console.warn(
      "WARN: Link header missing or incomplete on HTML homepage.\n" +
        "        Ensure dist/_headers is deployed and purge cache if needed.\n" +
        `        Got: ${linkHtml ? `${linkHtml.slice(0, 160)}…` : "(none)"}`
    );
  } else {
    console.log("OK: HTML homepage has Link header with llms discovery.");
  }

  console.log("\nDone (exit 0; warnings are non-fatal).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
