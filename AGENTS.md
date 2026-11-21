<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Analytics / Ads
- Google Ads tag (AW-17877629629) is a single global snippet in `src/routes/__root.tsx` head with Consent Mode v2 defaults denied in consent regions; consent state lives in `src/lib/consent.ts` (no banner; gtag.js loads only outside consent regions). Why: keeps one tag per page and the no-banner compliance route the owner chose; the only conversion event is the quote-form success, fired once via trackQuoteConversion after the server confirms.
- www.bocxepsaigon.vn redirects 301 to bocxepsaigon.vn via request middleware in src/start.ts; why: one canonical host for SEO.

## Technical SEO
- Missing blog records throw router notFound and query failures propagate; why: absent articles must not return indexable HTTP 200 pages.
- Organization staffing structured data uses the shared workforceLd value; why: keep the machine-readable count consistent with confirmed business information.
- The authenticated layout emits noindex; why: administrative screens are not public search destinations.
- The existing custom sitemap paginates public published posts and returns uncached 503 on source failure; why: preserve all public URLs instead of silently serving incomplete XML.
- Service-specific operational guidance lives in service-guidance.ts and extends the existing service data; why: keep each page's advice distinct while preserving its URL, metadata, media and shared layout.
- Booking duration copy derives from booking-policy.ts; why: keep FAQs and pricing notes consistent with the business policy.
- Router dehydration restores the per-request Query cache before hydration; why: the initial HTML and client must show the same database-backed content and links.
