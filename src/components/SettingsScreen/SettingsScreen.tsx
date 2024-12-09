import './SettingsScreen.scss';
import { LanguageOption } from "./Options/Language/Language";
import { DarkTheme } from './Options/Language/DarkTheme';

export const SettingsScreen: React.FC = () => {

    return (
        <div className='ss'>
            <div className='ss__body'>
            
                <div className='options-group'>
                    
                    <h3 className='options-group__name'>
                        Interface
                    </h3>

                    <div className='options-group__options'>
                        <LanguageOption className='options-group__options__option' />
                        <DarkTheme className='options-group__options__option' />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}