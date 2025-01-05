import './SplashScreen.scss'
import logo from '../../assets/images/logo.png';
import { Spin } from '../Spin/Spin';

interface SplashScreenTypes {
    
}

export const SplashScreen: React.FC<SplashScreenTypes> = () => {
    

    return (
        <div className='splash-screen'>
            <img src={logo} alt='logo' className='splash-screen__logo' />
            <h1>SeriesLog</h1>
            <Spin size='medium'/>
        </div>
    )
}