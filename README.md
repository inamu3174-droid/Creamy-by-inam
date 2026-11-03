# Creamy — ice-cream landing page

React 19 + TypeScript, bundled with esbuild (static output, deployable anywhere).

    npm install
    npm run dev     # http://localhost:5173
    npm run build   # type-check + static site in ./dist

Layout is authored in `em` against a 1160px-wide design card (`--u = card width / 116`), so the
desktop composition scales proportionally; below 900px the sections re-flow for touch.
Honors `prefers-reduced-motion`.