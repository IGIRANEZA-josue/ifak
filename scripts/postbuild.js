// Copies dist/index.html to dist/404.html so static hosts that serve
// a 404 page for unknown paths (e.g. GitHub Pages) still boot the SPA.
import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')
const notFound = join(dist, '404.html')

if (existsSync(index)) {
  copyFileSync(index, notFound)
  console.log('postbuild: dist/404.html created for static-host SPA fallback')
} else {
  console.warn('postbuild: dist/index.html not found, skipping 404.html fallback')
}
