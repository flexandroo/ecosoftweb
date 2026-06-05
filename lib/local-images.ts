// URL → local path map produced by scripts/upscale-products.mjs.
// Each entry is an upscaled product photo stored under public/products/upscaled.
// The original Ecosoft CDN URL is the key so we can swap in the local copy
// without ever modifying products.data.json (which is generated from XML).
import map from "./local-images.json";

const table = map as Record<string, string>;

/**
 * Return the upscaled local copy for a given product image URL, or the
 * original URL if no local copy exists yet.
 */
export function localizeImage(url: string | null | undefined): string | null {
  if (!url) return null;
  return table[url] ?? url;
}
