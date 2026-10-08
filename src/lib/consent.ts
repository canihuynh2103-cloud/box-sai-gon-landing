/**
 * Google Ads consent handling (single global tag AW-17877629629).
 *
 * Route chosen by the owner: regional consent banner.
 * - The Google tag always renders once per page (root head) with Consent Mode
 *   v2 defaults that DENY ad purposes inside consent regions until the visitor
 *   decides. Outside those regions the tag measures normally without a banner.
 * - The banner is shown only to visitors in consent regions (or when the
 *   region lookup fails / is unknown, per privacy-safe fallback).
 * - Each decision is stored locally (decision, timestamp, notice version) so
 *   the visitor can change or withdraw it later via "Cài đặt cookie" (footer).
 * - No conversion events are configured yet (owner will supply ID/label).
 */

export const ADS_ID = "AW-17877629629";
export const NOTICE_VERSION = "2026-10-08";
export const POLICY_PATH = "/chinh-sach-bao-mat";
const STORAGE_KEY = "bsg.cookie-consent.v1";

/** EEA + UK + CH + VN: regions where ad consent must be asked. */
const CONSENT_REGION_LIST: string[] = [
  "VN",
  // EU 27
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  // EEA extras + UK + CH + BR (LGPD) + KR (PIPA) + ZA (POPIA)
  "IS", "LI", "NO", "GB", "CH", "BR", "KR", "ZA",
];

export const CONSENT_REGIONS = new Set(CONSENT_REGION_LIST);

export const GTAG_SNIPPET = [
  "window.dataLayer = window.dataLayer || [];",
  "function gtag(){dataLayer.push(arguments);}",
  `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});`,
  "gtag('js', new Date());",
  `gtag('config','${ADS_ID}');`,
  `(function(){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);})();`,
].join("\n");

export type ConsentDecision = "accepted" | "rejected";

export interface StoredConsent {
  decision: ConsentDecision;
  acceptedAt: string | null;
  rejectedAt: string | null;
  noticeVersion: string;
}

const listeners = new Set<() => void>();
let bannerVisible = false;
let initialized = false;

function notify() {
  for (const l of listeners) l();
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getBannerVisible() {
  return bannerVisible;
}

export function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.decision !== "accepted" && parsed.decision !== "rejected") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(decision: ConsentDecision) {
  try {
    const prev = readConsent();
    const record: StoredConsent = {
      decision,
      acceptedAt: decision === "accepted" ? new Date().toISOString() : (prev?.acceptedAt ?? null),
      rejectedAt: decision === "rejected" ? new Date().toISOString() : null,
      noticeVersion: NOTICE_VERSION,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // storage unavailable (private mode etc.) — decision still applies for this visit
  }
}

function grantAll() {
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g === "function") {
    g("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }
}

/** Country from same-origin /cdn-cgi/trace; null on failure/unknown (privacy-safe). */
async function getCountry(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2000);
    const res = await fetch("/cdn-cgi/trace", { signal: controller.signal });
    window.clearTimeout(timer);
    if (!res.ok) return null;
    const text = await res.text();
    const line = text.split("\n").find((l) => l.startsWith("loc="));
    const loc = line?.slice(4).trim();
    if (!loc || loc === "XX" || loc === "T1") return null;
    return loc;
  } catch {
    return null;
  }
}

/** Called once from the root component (client only). */
export async function initConsent() {
  if (initialized) return;
  initialized = true;

  const stored = readConsent();
  if (stored) {
    if (stored.decision === "accepted") grantAll();
    bannerVisible = false;
    notify();
    return;
  }

  const country = await getCountry();
  if (country === null || CONSENT_REGIONS.has(country)) {
    bannerVisible = true;
  } else {
    grantAll();
  }
  notify();
}

/** Visitor accepted advertising measurement. */
export function acceptConsent() {
  writeConsent("accepted");
  grantAll();
  bannerVisible = false;
  notify();
}

/** Visitor refused — ad consent stays denied; opening settings keeps refusal. */
export function rejectConsent() {
  writeConsent("rejected");
  bannerVisible = false;
  notify();
}

/** Reopen the banner from the footer "Cài đặt cookie" link. */
export function openConsentSettings() {
  bannerVisible = true;
  notify();
}
