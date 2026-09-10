# Selected editorial design

Implements the selected September 10 editorial mockup with navy, crimson, serif display type, and rounded rectangular photo frames. The Jays Dallas uses the custom accessible JJJ monogram; Hilltop retains H. branding.

All photographic assets are bundled under `public/images`. These are generated illustrative scenes reconstructed from the selected mockup images, not representations of completed projects. UI labels, logos and text are live HTML/SVG rather than part of the photo. Responsive layouts adapt the desktop composition to smaller screens.

## Preview

Run `npm run build` before supervised preview. `scripts/dev.mjs` translates the preview host flags and serves that production build when `--strictPort` is supplied. Ordinary `npm run dev` retains the normal Next.js development server. Rebuild after source changes before restarting a supervised preview.
