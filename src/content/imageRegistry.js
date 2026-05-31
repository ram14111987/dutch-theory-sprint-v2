// Maps logical image src paths (as stored in lesson/question JSON) to bundled
// asset URLs. Vite's import.meta.glob picks up every SVG under ./images/**
// automatically — no manual entry needed when adding new images.
//
// Keys from glob are absolute-style Vite paths like:
//   /src/content/images/signs/warning-triangle.svg
// We strip the prefix to produce stable short keys like:
//   signs/warning-triangle.svg
// which is the format stored in JSON files.

const modules = import.meta.glob('./images/**/*.svg', { eager: true });

const PREFIX = './images/';

const registry = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [
    path.slice(PREFIX.length),
    mod.default,
  ])
);

export function resolveImageSrc(src) {
  if (!src) return null;
  return registry[src] || null;
}
