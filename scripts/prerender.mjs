import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

// Include the entire CFP in the delivered HTML for search engines, link
// previews, and readers without JavaScript. No server is needed at runtime.
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const markup = renderToString(createElement(App))
  const path = new URL('../dist/index.html', import.meta.url)
  const html = await readFile(path, 'utf8')
  await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`))
  console.log('Prerendered the workshop, topics, dates, and organizers into dist/index.html.')
} finally {
  await server.close()
}
