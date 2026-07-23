import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Remove StrictMode to avoid double useEffect invocations interfering with the loading screen timer
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
