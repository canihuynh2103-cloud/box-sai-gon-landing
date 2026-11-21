export function coversSite(siteUrl: string, targetUrl: string) {
  const target = new URL(targetUrl);
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice(10).toLowerCase();
    return target.hostname === domain || target.hostname.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}
export function searchPeriod(today = new Date()) {
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}
