import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { CrmProvider } from './contexts/CrmContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CrmProvider>
      <Router>
        <App />
      </Router>
    </CrmProvider>
  </React.StrictMode>
)
