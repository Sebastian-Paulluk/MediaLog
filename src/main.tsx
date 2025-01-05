import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { UserProvider } from './context/userContext.tsx'
import { DataProvider } from './context/DataContext.tsx'

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <DataProvider>
            <App />
        </DataProvider>
    </UserProvider>
)
