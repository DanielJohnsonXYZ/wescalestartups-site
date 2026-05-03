import { siteConfig } from "../site";

export function normalizePath(path = "/") {
  if (path === "/index.html") return "/";
  if (path.endsWith("/index.html")) return path.replace(/\/index\.html$/, "");
  if (path.endsWith(".html")) return path.slice(0, -5);
  return path || "/";
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const cleanPath = normalizePath(path);
  const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  /** Match `trailingSlash: "never"`: apex canonical has no trailing slash. */
  if (normalized === "/") return siteConfig.siteUrl;
  return `${siteConfig.siteUrl}${normalized}`;
}

export function sortByOrder<T extends { data: { order?: number } }>(items: T[]) {
  return items.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}
