import { useDataContext } from '../../context/DataContext';
import './Toast.scss';
import { Spin } from '../Spin/Spin';

export const Toast: React.FC = () => {
	const { changesSaved } = useDataContext();

	return (
		<div className={`toast ${changesSaved ? '' : 'visible'}`}>
			<Spin />
		</div>
	);
};
