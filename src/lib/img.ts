export function img(url: string | undefined, width = 1200): string | undefined {
  if (!url) return url;
  if (!/^https?:\/\//i.test(url)) return url;
  const base = url.replace(/^https?:\/\//i, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(base)}&w=${width}&output=webp&q=85&we&maxage=1y`;
}
