import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "https://fe2e76837b766e394a8f102c9256cd65@o4511244994215936.ingest.de.sentry.io/4511245053984848",
  tracesSampleRate: 0.1
});
