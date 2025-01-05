import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { UserProvider } from './context/userContext.tsx'

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <App />
    </UserProvider>
)
