# Consent preview regressions

Run against the existing development server at `http://localhost:8080`:

```sh
python3 tests/consent/check_preview.py
python3 tests/consent/check_edge_cases.py
python3 tests/consent/check_quote.py
bun test ./src/lib/consent-flow.test.ts ./src/lib/tracking-invariants.test.ts
```

Browser artifacts stay under `/tmp/browser/consent`. Google tag downloads are intercepted. The quote test intercepts the browser's server-function request: no email is sent and no database data is written. It checks zero conversion events while waiting, one after simulated success with advertising consent, and zero after network failure or denied advertising consent. This does not verify Google Ads ingestion or real backend persistence.

The standard consent module is copied unchanged from the `lovable-cookie-consent-banner` skill. Its upstream formatting is retained; lint it with only the formatting rule disabled. All project-specific files use the regular lint rules.