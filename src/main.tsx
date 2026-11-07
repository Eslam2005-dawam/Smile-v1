import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/tokens.css'
import './styles/manus.css'
import './styles/catalog.css'
import './styles/motion.css'
import './styles/commerce.css'
import './styles/product-detail.css'
import './styles/catalog-integration.css'
import './styles/home-v2.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter></StrictMode>,
)
