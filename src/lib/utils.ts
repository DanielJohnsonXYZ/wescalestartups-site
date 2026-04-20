import { siteConfig } from "../site";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalized}`;
}

export function sortByOrder<T extends { data: { order?: number } }>(items: T[]) {
  return items.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}
