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
- Keep the standard per-purpose consent module unchanged in `src/lib/consent.ts`; `src/lib/google-ads.ts` adds notice-version validation and global explicit opt-in, and the root mounts one non-modal banner with footer settings. Why: analytics and advertising answers stay separate, incompatible answers stay denied, and Ads loads once only after advertising acceptance; Contact alone calls the unchanged conversion destination after backend success.
- www.bocxepsaigon.vn redirects 301 to bocxepsaigon.vn via request middleware in src/start.ts; why: one canonical host for SEO.

## Technical SEO
- JSON-LD declares one LocalBusiness in the root head under the shared BUSINESS_ID; other pages reference it by @id. Why: avoid duplicate business entities and keep NAP consistent.
- Public search uses the shared Vietnamese normalization and Fuse matching; service suggestions precede articles without creating search URLs. Why: retain crawlable existing routes while supporting accented, unaccented and mistyped queries.
- SEO keyword records live in an admin-only table and never modify public page metadata automatically. Why: keep editorial planning and measured evidence separate from published content.
- Search Console refresh revalidates the chosen verified property and admin role before saving query/page snapshots; public requests only use existing content. Why: prevent credential exposure and keep provider traffic out of visitor rendering.
- Missing blog records throw router notFound and query failures propagate; why: absent articles must not return indexable HTTP 200 pages.
- Organization staffing structured data uses the shared workforceLd value; why: keep the machine-readable count consistent with confirmed business information.
- The authenticated layout emits noindex; why: administrative screens are not public search destinations.
- The existing custom sitemap paginates public published posts and returns uncached 503 on source failure; why: preserve all public URLs instead of silently serving incomplete XML.
- Service-specific operational guidance lives in service-guidance.ts and extends the existing service data; why: keep each page's advice distinct while preserving its URL, metadata, media and shared layout.
- Booking duration copy derives from booking-policy.ts; why: keep FAQs and pricing notes consistent with the business policy.
- Router dehydration restores the per-request Query cache before hydration; why: the initial HTML and client must show the same database-backed content and links.
- Header height is reserved in CSS at mobile/desktop breakpoints, without post-hydration measurement; why: the fixed header must not shift the hero when fonts or client state arrive.
- The homepage uses a bundled WebP derivative of the existing hero and no scroll-driven React parallax; why: reduce image bytes and scroll renders without changing the original image or asset manifests.
- Contact actions are one vertical right-edge column offset by safe-area insets; the consent panel opens only from the footer settings link (defaults stay denied); why: owner rejected the bottom bar and auto-opening popup.

## Content security
- Sanitize rich HTML through the shared safe-html allowlist before public rendering, preview, editor insertion and saving; why: stored content must never execute scripts in visitor or administrator sessions.
- Signup only creates a profile and never grants administrator roles automatically; why: privileges must require an existing administrator's explicit decision.
