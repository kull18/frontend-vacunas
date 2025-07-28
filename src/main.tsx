import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './features/Users/User/Presentation/Hooks/AuthProvider.tsx'
import { AuthUser } from './features/Users/User/Presentation/Hooks/AuthUser';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <AuthUser>
            <App />
        </AuthUser>
      </AuthProvider>
  </StrictMode>,
)
