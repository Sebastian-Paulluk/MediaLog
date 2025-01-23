import './SettingsButton.scss';
import settingsImg from '../../../assets/images/settings.png';
import { PopMenu } from '../../PopMenu/PopMenu';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../services/firebase';
import { useUserContext } from '../../../context/userContext';
import normalizeText from '../../../utils/normalizeText';

export const SettingsButton: React.FC = () => {
	const { user } = useUserContext();
	const userName = normalizeText.firstLetterCaps(user?.name);
	const navigate = useNavigate();

	const handleUserLogout = () => {
		logoutUser();
		navigate('/login');
	};

	const popMenuProps = {
		header: userName,
		options: [
			{ name: 'Logout', icon: 'logout', onClick: handleUserLogout },
		],
	};

	return (
		<PopMenu {...popMenuProps}>
			<div className="settings-button">
				<img
					src={settingsImg}
					alt="settings"
					className="settings-button__img"
				/>
			</div>
		</PopMenu>
	);
};
