import { useLocation } from 'react-router-dom'
import { Path } from './path/path'
import { SearchInput } from './SearchInput/SearchInput'
import './ToolsBar.scss'
import { Settings } from './Settings/Settings'

interface ToolsBarTypes {
    
}

export const ToolsBar: React.FC<ToolsBarTypes> = () => {
    const location = useLocation();
    
    

    return (
        <div className='tools-bar-container'>
            {location.pathname === '/settings' ? (
                    <Settings />
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