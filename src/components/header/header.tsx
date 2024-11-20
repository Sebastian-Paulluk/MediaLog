import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import { FavButton } from './FavButton/FavButton';
import { Toast } from '../Toast/Toast';
import { UserButton } from './UserButton/UserButton';
import { useDataContext } from '../../context/DataContext';
import { logoutUser } from '../../services/firebase';
import logo from '../../assets/images/logo.png';
import { SettingsButton } from './SettingsButton/SettingsButton';

export const Header = () => {
	const {user} = useDataContext();
    const navigate = useNavigate();
	
	const handleUserLogout =()=>{
        logoutUser();
        navigate("/login");
    }

	return (
		<div className='header'>
			<div className='header__content'>
				{
					user ? (
						<>
							<div className='header__content__left'>
								<Link to={'/'}>
									<div className='logo-name-container'>
										<img src={logo} alt='logo' className='logo-img'/>
										<p className='header_title'>SeriesLog</p>
									</div>
								</Link>
								<Toast />
							</div>

							<div className='header__content__right'>
								<UserButton handleUserLogout={handleUserLogout} />
								<FavButton />
								<SettingsButton />
							</div>
						</>
					) : (
						<Link to={'/'}>
							<div className='logo-name-container'>
								<img src={logo} alt='logo' className='logo-img'/>
								<p className='header_title'>SeriesLog</p>
							</div>
						</Link>
					)
				}
			</div>
		</div>		
	);
};
