import { test } from "node:test";
import assert from "node:assert/strict";
import {
  choiceFor,
  GTAG_SNIPPET,
  initConsent,
  NOTICE_VERSION,
  saveSiteChoices,
  shouldShowBanner,
  trackQuoteConversion,
  validNotice,
} from "./google-ads";

test("incompatible notice versions never authorize tracking", () => {
  assert.equal(validNotice({ version: "2026-10-08", at: Date.now() }), false);
});
test("current notice persists a timestamp with a 183-day lifetime", () => {
  const now = 1_000_000_000_000;
  assert.equal(validNotice({ version: NOTICE_VERSION, at: now }, now), true);
  assert.equal(validNotice({ version: NOTICE_VERSION, at: now - 183 * 86400000 }, now), false);
  assert.equal(validNotice({ version: NOTICE_VERSION, at: now + 1 }, now), false);
});
test("consent denies by default, separates purposes, loads Ads once, drops denied conversions and respects GPC", async () => {
  const storage = new Map<string, string>();
  const events = new EventTarget();
  const commands: unknown[][] = [];
  const scripts: { src: string }[] = [];
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      gtag: (...args: unknown[]) => commands.push(args),
      dispatchEvent: events.dispatchEvent.bind(events),
      addEventListener: events.addEventListener.bind(events),
      removeEventListener: events.removeEventListener.bind(events),
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { globalPrivacyControl: false },
  });
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: {
      querySelector: () => scripts[0] ?? null,
      createElement: () => ({ dataset: {}, src: "", async: false }),
      head: { appendChild: (script: { src: string }) => scripts.push(script) },
    },
  });
  initConsent();
  assert.equal(shouldShowBanner(), true);
  assert.equal(scripts.length, 0);
  trackQuoteConversion();
  assert.equal(commands.filter((c) => c[1] === "conversion").length, 0);
  saveSiteChoices({ analytics: "granted", advertising: "denied" });
  assert.equal(choiceFor("analytics"), "granted");
  assert.equal(choiceFor("advertising"), "denied");
  assert.equal(scripts.length, 0);
  saveSiteChoices({ analytics: "granted", advertising: "granted" });
  await Promise.resolve();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0]?.src, "https://www.googletagmanager.com/gtag/js?id=AW-17877629629");
  initConsent();
  saveSiteChoices({ analytics: "granted", advertising: "granted" });
  await Promise.resolve();
  assert.equal(scripts.length, 1);
  assert.equal(commands.filter((c) => c[1] === "conversion").length, 0);
  trackQuoteConversion();
  assert.equal(commands.filter((c) => c[1] === "conversion").length, 1);
  saveSiteChoices({ analytics: "denied", advertising: "denied" });
  trackQuoteConversion();
  assert.equal(commands.filter((c) => c[1] === "conversion").length, 1);
  assert.equal(choiceFor("advertising"), "denied");
  const notice = JSON.parse(storage.get("saigonhandling.consent-notice") ?? "null");
  assert.equal(notice.version, "2026-11-23-v2");
  assert.equal(typeof notice.at, "number");
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: { globalPrivacyControl: true },
  });
  assert.equal(choiceFor("advertising"), "denied");
  assert.equal(shouldShowBanner(), false);
});
test("the initial defaults deny every purpose before any config", () => {
  const commands: unknown[][] = [];
  const storage = new Map<string, string>();
  storage.set(
    "saigonhandling.consent-notice",
    JSON.stringify({ version: "2026-10-08", at: Date.now() }),
  );
  storage.set("cookie_consent_advertising", JSON.stringify({ choice: "granted", at: Date.now() }));
  new Function("window", "localStorage", "navigator", "dataLayer", `${GTAG_SNIPPET}`)(
    { dataLayer: commands },
    {
      getItem: (key: string) => storage.get(key),
      removeItem: (key: string) => storage.delete(key),
    },
    {},
    commands,
  );
  const first = Array.from(commands[0] ?? []);
  assert.equal(first[0], "consent");
  assert.equal(first[1], "default");
  assert.deepEqual(first[2], {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  assert.equal(storage.has("cookie_consent_advertising"), false);
});
