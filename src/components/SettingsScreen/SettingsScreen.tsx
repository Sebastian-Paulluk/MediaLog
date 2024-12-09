import './SettingsScreen.scss';
import { LanguageOption } from "./Options/Language/Language";

export const SettingsScreen: React.FC = () => {

    return (
        <div className='ss'>
            <div className='ss__body'>
            
                <div className='options-group'>
                    
                    <h3 className='options-group__name'>
                        Interface
                    </h3>
                    <LanguageOption />

                </div>
            </div>
        </div>
    )
}