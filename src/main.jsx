import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is intentionally off: in development it double-mounts and can
// tear down third-party checkouts (PayPal) while a buyer is mid-flow.
createRoot(document.getElementById('root')).render(<App />)
