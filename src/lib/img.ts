/**
 * Optimizes Google-hosted (lh3.googleusercontent.com) images by requesting a
 * resized WebP variant via the CDN's sizing syntax. `-rw` asks for WebP, and
 * `w<width>` caps the delivered width to the actual display size, dramatically
 * reducing transferred bytes without any visible quality loss.
 *
 * Non-Google URLs (or URLs that already carry a size token) are returned as-is.
 */
export function cdnImg(url: string, width: number): string {
  if (!url || !url.includes("googleusercontent.com")) return url;
  if (/=[ws]\d+/.test(url)) return url;
  return `${url}=w${width}-rw`;
}

/**
 * Builds a responsive `srcset` of WebP variants so the browser can pick the
 * smallest image that fits the device — major byte savings on mobile.
 */
export function cdnSrcSet(url: string, widths: number[]): string {
  return widths.map((w) => `${cdnImg(url, w)} ${w}w`).join(", ");
}
