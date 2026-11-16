/** Prefixes a public file path with the base path when the site is served from a sub-folder (GitHub Pages project site). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
