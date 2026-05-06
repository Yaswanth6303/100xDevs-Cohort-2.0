import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppUseRef from './AppUseRef.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppUseRef />
  </React.StrictMode>,
)
