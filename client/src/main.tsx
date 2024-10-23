// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WordProvider } from './components/context/WordContext'
import App from './App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <WordProvider>
    <App />
  </WordProvider>
  // <StrictMode>
  // </StrictMode>,
)
