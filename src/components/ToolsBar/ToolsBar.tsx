import { useLocation } from 'react-router-dom'
import { Path } from './path/path'
import { SearchInput } from './SearchInput/SearchInput'
import './ToolsBar.scss'
import { useUserContext } from '../../context/userContext'

interface ToolsBarTypes {
    
}

export const ToolsBar: React.FC<ToolsBarTypes> = () => {
    const location = useLocation();
    const {user} = useUserContext();


    return (
        <div className='tools-bar-container'>
            {location.pathname === '/settings' ? (
                <>
                    {   
                        user?.UILanguage === 'español' ? 'Ajustes' :
                        user?.UILanguage === 'français' ? 'Paramètres' :
                        'Settings'
                    }
                </>
                    
                ) : (
                    <div className='tools-bar'>
                        <Path />
                        <SearchInput />
                    </div>
                )
            }

        </div>
    )
}