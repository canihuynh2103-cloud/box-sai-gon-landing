import {
  applySignals,
  canTrack,
  onConsentChange,
  readChoice,
  saveChoices,
  type Choice,
  type Purpose,
} from "./consent";

export const ADS_ID = "AW-17877629629";
export const QUOTE_CONVERSION_SEND_TO = "AW-17877629629/f-4LCKyL1pUdEL3128xC";
export const NOTICE_VERSION = "2026-11-23-v2";
export const POLICY_PATH = "/chinh-sach-bao-mat";
const NOTICE_KEY = "saigonhandling.consent-notice";
export const PURPOSES: Purpose[] = ["analytics", "advertising"];
// Explicit opt-in everywhere includes VN, EEA, UK, CH, Canada and unknown locations.
export const CONSENT_REGIONS = new Set([
  "VN",
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
  "CA",
  "BR",
  "KR",
  "ZA",
]);
export const GTAG_SNIPPET =
  '(function () {\n  try {\n    var notice = JSON.parse(localStorage.getItem("saigonhandling.consent-notice") || "null");\n    if (!notice || notice.version !== "2026-11-23-v2" || typeof notice.at !== "number" || notice.at > Date.now() || Date.now() - notice.at >= 183 * 86400000) {\n      localStorage.removeItem("cookie_consent_analytics");\n      localStorage.removeItem("cookie_consent_advertising");\n    }\n  } catch (e) {\n    try { localStorage.removeItem("cookie_consent_analytics"); localStorage.removeItem("cookie_consent_advertising"); } catch (ignored) {}\n  }\n})();\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag() {\n  dataLayer.push(arguments);\n}\ngtag("consent", "default", {\n  analytics_storage: "denied",\n  ad_storage: "denied",\n  ad_user_data: "denied",\n  ad_personalization: "denied",\n});\ngtag("consent", "default", {\n  analytics_storage: "denied",\n  ad_storage: "denied",\n  ad_user_data: "denied",\n  ad_personalization: "denied",\n  wait_for_update: 500,\n  region:\n    "AT,BE,BG,HR,CY,CZ,DK,EE,FI,FR,DE,GR,HU,IE,IT,LV,LT,LU,MT,NL,PL,PT,RO,SK,SI,ES,SE,IS,LI,NO,GB,CH,RE,GP,MQ,GF,YT,MF,AX,CA-QC".split(\n      ",",\n    ),\n});\n(function () {\n  var signals = {\n    analytics: ["analytics_storage"],\n    advertising: ["ad_storage", "ad_user_data", "ad_personalization"],\n  };\n  for (var purpose in signals) {\n    var choice = null;\n    try {\n      var saved = JSON.parse(localStorage.getItem("cookie_consent_" + purpose) || "null");\n      if (\n        saved &&\n        (saved.choice === "denied" || (saved.choice === "granted" && Date.now() - saved.at < 365 * 86400000))\n      ) {\n        choice = saved.choice;\n      }\n    } catch (e) {}\n    if (navigator.globalPrivacyControl === true) choice = "denied";\n    if (!choice) continue;\n    var update = {};\n    signals[purpose].forEach(function (signal) {\n      update[signal] = choice;\n    });\n    gtag("consent", "update", update);\n  }\n})();\n' +
  "\ngtag('js', new Date());\ngtag('config','AW-17877629629');";

export function validNotice(value: unknown, now = Date.now()): boolean {
  if (!value || typeof value !== "object") return false;
  const notice = value as { version?: unknown; at?: unknown };
  return (
    notice.version === NOTICE_VERSION &&
    typeof notice.at === "number" &&
    Number.isFinite(notice.at) &&
    notice.at <= now &&
    now - notice.at < 183 * 86400000
  );
}
let memoryNotice: { version: string; at: number } | undefined;
function hasCurrentNotice(): boolean {
  if (validNotice(memoryNotice)) return true;
  try {
    return validNotice(JSON.parse(localStorage.getItem(NOTICE_KEY) ?? "null"));
  } catch {
    return validNotice(memoryNotice);
  }
}
export function privacySignal(): boolean {
  return (
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
  );
}
export function choiceFor(purpose: Purpose): Choice | null {
  return privacySignal() ? "denied" : hasCurrentNotice() ? readChoice(purpose) : null;
}
export function shouldShowBanner(): boolean {
  return !privacySignal() && PURPOSES.some((purpose) => choiceFor(purpose) === null);
}
export function saveSiteChoices(choices: Record<Purpose, Choice>): void {
  const notice = { version: NOTICE_VERSION, at: Date.now() };
  try {
    localStorage.setItem(NOTICE_KEY, JSON.stringify(notice));
    memoryNotice = undefined;
  } catch {
    memoryNotice = notice; // session-only when storage is unavailable
  }
  saveChoices(choices);
}
export function openCookieSettings(): void {
  window.dispatchEvent(new Event("open-cookie-settings"));
}
let initialized = false;
let advertisingAllowed = false;
function loadGtag(): void {
  if (document.querySelector("script[data-saigon-ads]")) return;
  const script = document.createElement("script");
  script.async = true;
  script.dataset["saigonAds"] = ADS_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(script);
}
function reconcile(): void {
  // Pin missing answers to denied so the standard module's asynchronous
  // non-consent-region fallback cannot grant a cleared answer in another tab.
  const missing: Partial<Record<Purpose, Choice>> = {};
  for (const purpose of PURPOSES) {
    if (readChoice(purpose) === null) missing[purpose] = "denied";
  }
  if (Object.keys(missing).length > 0) saveChoices(missing);
  advertisingAllowed = choiceFor("advertising") === "granted";
  for (const purpose of PURPOSES) applySignals(purpose, choiceFor(purpose) ?? "denied");
  if (!advertisingAllowed) return;
  void canTrack("advertising").then((allowed) => {
    if (allowed && choiceFor("advertising") === "granted") loadGtag();
  });
}
export function initConsent(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  reconcile();
  onConsentChange(reconcile);
  window.addEventListener("storage", (event) => {
    if (event.key === NOTICE_KEY || event.key === null) {
      memoryNotice = undefined;
      reconcile();
    }
  });
}
// Called only by Contact after backend success. Denied events are dropped, never replayed on acceptance.
export function trackQuoteConversion(): void {
  if (
    typeof window === "undefined" ||
    !advertisingAllowed ||
    choiceFor("advertising") !== "granted"
  )
    return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "conversion", { send_to: QUOTE_CONVERSION_SEND_TO, value: 1.0, currency: "VND" });
  if (choiceFor("analytics") === "granted") gtag?.("event", "form_success", { form: "quote" });
}
let clicksBound = false;
export function initClickTracking(): void {
  if (clicksBound || typeof document === "undefined") return;
  clicksBound = true;
  document.addEventListener(
    "click",
    (event) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.("a[href]");
      const href = anchor?.getAttribute("href") ?? "";
      const name = href.startsWith("tel:")
        ? "click_phone"
        : /zalo/i.test(href)
          ? "click_zalo"
          : null;
      if (!name || choiceFor("analytics") !== "granted" || choiceFor("advertising") !== "granted")
        return;
      void canTrack("analytics").then((allowed) => {
        if (
          !allowed ||
          choiceFor("analytics") !== "granted" ||
          choiceFor("advertising") !== "granted"
        )
          return;
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", name, {
          page_path: window.location.pathname,
        });
      });
    },
    { capture: true },
  );
}
