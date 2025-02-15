import { CategoryTypes, ItemTypes } from '../../../types/types';
import './DrawerCategory.scss';
import arrowImg from '../../../assets/images/arrow.png';
import { useDataContext } from '../../../context/DataContext';
import { useEffect, useState } from 'react';
import { DrawerItem } from '../DrawerItem/DrawerItem';

interface DrawerCategoryTypes {
	category: CategoryTypes;
	openCategory: CategoryTypes | null;
	setOpenCategory: (category: CategoryTypes | null) => void;
}

export const DrawerCategory: React.FC<DrawerCategoryTypes> = ({
	category,
	openCategory,
	setOpenCategory,
}) => {
	const { items, getFavoriteItemsInCategory } = useDataContext();
	const [favoriteItems, setFavoriteItems] = useState<ItemTypes[]>();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (category.id) {
			const favItems = getFavoriteItemsInCategory(category.id);
			setFavoriteItems(favItems);
		}
		setOpen(openCategory === category);
	}, [items, openCategory, category, getFavoriteItemsInCategory]);

	const handleCategoryClick = () => {
		setOpenCategory(openCategory === category ? null : category);
	};

	return (
		<ul>
			<li
				className={`drawer-category
                            ${open ? 'open' : ''}
                            ${favoriteItems?.length === 0 ? 'empty' : ''}
                            `}
			>
				<div
					className="drawer-category__button"
					onClick={handleCategoryClick}
				>
					<p className="drawer-category__button__title">
						{category && category.name}
					</p>
					<p className="fav-items-size">{favoriteItems?.length}</p>
					<img
						src={arrowImg}
						alt="open-category"
						className="drawer-category__button__img"
					/>
				</div>
				<ul className="drawer-favorites-list">
					{favoriteItems &&
						favoriteItems.map((item) => (
							<DrawerItem item={item} key={item.id} />
						))}
				</ul>
			</li>
		</ul>
	);
};
