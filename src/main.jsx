import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NoteContextProvider from './context/NoteContextProvider.jsx'
import AuthContextProvider from './context/AuthContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthContextProvider>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </AuthContextProvider>
  // </StrictMode>,
)
