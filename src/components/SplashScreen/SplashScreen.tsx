import './SplashScreen.scss';
import logo from '../../assets/images/logo.png';
import { Spin } from '../Spin/Spin';

export const SplashScreen: React.FC = () => {
	return (
		<div className="splash-screen">
			<img src={logo} alt="logo" className="splash-screen__logo" />
			<h1>MediaLog</h1>
			<Spin size="medium" />
		</div>
	);
};
