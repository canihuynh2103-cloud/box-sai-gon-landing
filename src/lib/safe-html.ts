import sanitize from "sanitize-html";

/** Same deterministic allowlist in SSR, public articles, previews and editing. */
export function safePostHtml(html: string): string {
  return sanitize(html, {
    allowedTags: [...sanitize.defaults.allowedTags, "img", "figure", "figcaption", "details", "summary", "iframe", "nav"],
    allowedAttributes: {
      "*": ["class", "id", "title"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      iframe: ["src", "title", "width", "height", "loading", "allowfullscreen"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "tel", "mailto"],
    allowedSchemesByTag: { img: ["https", "http"], iframe: ["https"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "www.google.com"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({ tagName, attribs: { ...attribs, ...(attribs.target === "_blank" ? { rel: "noopener noreferrer" } : {}) } }),
    },
  });
}

export function escapeHtmlText(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}