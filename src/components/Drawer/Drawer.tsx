import { useEffect, useState } from 'react';
import './Drawer.scss';
import closeImg from '../../assets/images/close-fill.png';
import { CategoryTypes } from '../../types/types';
import { useDataContext } from '../../context/DataContext';
import { DrawerCategory } from './DrawerCategory/DrawerCategory';

interface DrawerTypes {
	open: boolean;
	hideDrawer: () => void;
}

export const Drawer: React.FC<DrawerTypes> = ({ open, hideDrawer }) => {
	const [visibility, setVisibility] = useState(open);
	const { categories } = useDataContext();
	const [localCategories, setLocalCategories] =
		useState<CategoryTypes[]>(categories);
	const [openCategory, setOpenCategory] = useState<CategoryTypes | null>(
		null
	);

	useEffect(() => {
		setLocalCategories(categories);
	}, [categories]);

	const lockScroll = () => {
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	};

	const unlockScroll = () => {
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
	};

	useEffect(() => {
		setVisibility(open);
		if (open) {
			lockScroll();
		} else {
			unlockScroll();
		}

		return () => unlockScroll();
	}, [open]);

	const handleCloseDrawer = () => {
		setOpenCategory(null);
		hideDrawer();
	};

	const drawerContent = {
		title: 'Favorites',
	};

	return (
		<div className={`drawer ${visibility ? '' : 'hidden'}`}>
			<div className="drawer__background" onClick={handleCloseDrawer} />
			<div className="drawer__menu">
				<div className="drawer__menu__header">
					<div className="drawer__menu__header__title">
						{' '}
						{drawerContent.title}{' '}
					</div>
					<button
						className="drawer__menu__header__close-button"
						onClick={handleCloseDrawer}
					>
						<img
							className="close-button-img"
							src={closeImg}
							alt="close"
						/>
					</button>
				</div>
				<div className="drawer__menu__content">
					{localCategories.map((cat) => (
						<DrawerCategory
							key={cat.id}
							category={cat}
							openCategory={openCategory}
							setOpenCategory={setOpenCategory}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
