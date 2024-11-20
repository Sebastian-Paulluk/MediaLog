import './path.scss';
import { Link } from 'react-router-dom';
import normalizeText from '../../../utils/normalizeText';
import { useCurrentCategoryContext } from '../../../context/categoryContext';
import arrowRightImg from '../../../assets/images/arrow-right.png'

export const Path = () => {
	const { currentCategory } = useCurrentCategoryContext();

	console.log()

	return (
		<div className="path">
			<Link
				to="/"
				className={`home-path ${!currentCategory ? 'active' : ''}`}
			>
				Home
			</Link>
			{currentCategory && (
				<>
					<span className="path-separator"> 
						<img src={arrowRightImg} alt='path separator' className='path-separator__img'/>
					</span>
					<span className="current-path active">
						{ normalizeText.firstLettersCaps(currentCategory.name) }
					</span>
				</>
			)}
		</div>
	);
};
