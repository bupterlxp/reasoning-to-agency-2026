import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/dm-sans/standard.css'
import '@fontsource-variable/manrope'
import './styles.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
