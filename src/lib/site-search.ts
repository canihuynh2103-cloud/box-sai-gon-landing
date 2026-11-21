import Fuse from "fuse.js";

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

/** Exact matches lead; fuzzy matching handles minor typing errors without inventing results. */
export function searchItems<T>(items: T[], query: string, text: (item: T) => string): T[] {
  const needle = normalizeSearch(query);
  if (!needle) return items;
  const indexed = items.map((item) => ({ item, text: normalizeSearch(text(item)) }));
  const exact = indexed.filter((entry) => entry.text.includes(needle));
  const exactItems = new Set(exact.map((entry) => entry.item));
  const fuzzy = new Fuse(indexed, {
    keys: ["text"],
    threshold: 0.25,
    ignoreLocation: true,
    minMatchCharLength: 3,
  });
  return [
    ...exact.map((entry) => entry.item),
    ...fuzzy
      .search(needle)
      .map((entry) => entry.item.item)
      .filter((item) => !exactItems.has(item)),
  ];
}
