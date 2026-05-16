import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext' // Shuni qo'shing

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* App ni o'rab qo'yamiz */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)