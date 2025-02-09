import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SongProvider } from './context/SongContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SongProvider >
        <BrowserRouter >
          <App />
        </BrowserRouter>
      </SongProvider>
    </QueryClientProvider>
  </StrictMode>,
)
