import { Spin } from '../Spin/Spin';
import './loadingScreen.scss';

interface LoadingScreenTypes {
    size?: string;
}

export const LoadingScreen: React.FC<LoadingScreenTypes> = ({size='large'}) => {
    
    return (
        <div className='loading-screen'>
            <Spin size={size}/>
        </div>
    )
};
