import { Path } from './path/path'
import { SearchInput } from './SearchInput/SearchInput'
import './ToolsBar.scss'

interface ToolsBarTypes {
    
}

export const ToolsBar: React.FC<ToolsBarTypes> = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    return (
        <div className='tools-bar-container'>
            {
                isAuthenticated ? (
                    <div className='tools-bar'>
                        <Path />
                        <SearchInput />
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}