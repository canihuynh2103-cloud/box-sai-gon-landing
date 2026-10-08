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
