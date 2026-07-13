import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://fe2e76837b766e394a8f102c9256cd65@o4511244994215936.ingest.de.sentry.io/4511245053984848",
  enabled: typeof window !== "undefined" && window.localStorage.getItem("wss-consent-v1") === "granted",
  sendDefaultPii: false,
  tracesSampleRate: 0.1
});
