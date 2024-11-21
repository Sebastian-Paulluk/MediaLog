import { Spin } from '../Spin/Spin';
import './loadingScreen.scss';

interface LoadingScreenTypes {
    size?: string;
    paddingTop?: string;
}

export const LoadingScreen: React.FC<LoadingScreenTypes> = ({size='large', paddingTop='close'}) => {
    
    return (
        <div className='loading-screen'>
            <Spin size={size} paddingTop={paddingTop}/>
        </div>
    )
};
