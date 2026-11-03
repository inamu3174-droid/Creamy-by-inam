// Deploy the already-bundled site assets from the repository root.
import fs from 'node:fs'

fs.rmSync('dist', { recursive: true, force: true })
fs.mkdirSync('dist/assets', { recursive: true })
fs.copyFileSync('index.html', 'dist/index.html')
fs.copyFileSync('app.css', 'dist/assets/app.css')
fs.copyFileSync('app.js', 'dist/assets/app.js')
console.log('Static site copied to dist/')
