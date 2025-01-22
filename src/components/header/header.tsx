import { Link } from 'react-router-dom';
import './header.scss';
import { FavButton } from './FavButton/FavButton';
import { Toast } from '../Toast/Toast';
import logo from '../../assets/images/logo.png';
import { SettingsButton } from './SettingsButton/SettingsButton';
import { useUserContext } from '../../context/userContext';

export const Header = () => {
	const { user } = useUserContext();

	return (
		<div className="header">
			<div className="header__content">
				{user ? (
					<>
						<div className="header__content__left">
							<Link to={'/'}>
								<div className="logo-name-container">
									<img
										src={logo}
										alt="logo"
										className="logo-img"
									/>
									<p className="header_title">MediaLog</p>
								</div>
							</Link>
							<Toast />
						</div>

						<div className="header__content__right">
							<FavButton />
							<SettingsButton />
						</div>
					</>
				) : (
					<Link to={'/'}>
						<div className="logo-name-container">
							<img src={logo} alt="logo" className="logo-img" />
							<p className="header_title">MediaLog</p>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
