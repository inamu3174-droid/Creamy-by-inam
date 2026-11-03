// Static build: esbuild bundles TS/React + CSS (fonts inlined as hashed assets) into ./dist
import { build, context } from 'esbuild'
import fs from 'node:fs'

const dev = process.argv.includes('--dev')
const opts = {
  entryPoints: { app: 'src/main.tsx' },
  bundle: true,
  outdir: 'dist/assets',
  format: 'esm',
  target: ['es2020', 'chrome100', 'safari15', 'firefox100'],
  jsx: 'automatic',
  minify: !dev,
  sourcemap: dev,
  loader: { '.ttf': 'file', '.woff2': 'file' },
  assetNames: '[name]-[hash]',
  define: { 'process.env.NODE_ENV': dev ? '"development"' : '"production"' },
  logLevel: 'info',
}

fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist', { recursive: true })
fs.copyFileSync('index.html', 'dist/index.html')

if (dev) {
  const ctx = await context(opts)
  await ctx.watch()
  const { port } = await ctx.serve({ servedir: 'dist', port: 5173 })
  console.log(`dev server → http://localhost:${port}`)
} else {
  await build(opts)
}