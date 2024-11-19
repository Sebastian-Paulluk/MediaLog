import { useEffect, useState } from 'react';
import './categoryContainer.scss';
import { useParams } from 'react-router-dom';
import { CategoryDetail } from '../categoryDetail/categoryDetail';
import { CategoryTypes } from '../../types/types';
import { getCategoryById } from '../../services/firebase';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { useCurrentCategoryContext } from '../../context/categoryContext';

export const CategoriesContainer = () => {
	const { currentCategory } = useCurrentCategoryContext();
	const { categoryId } = useParams<{ categoryId: string }>();
	const [ category, setCategory ] = useState<CategoryTypes | null>(null);
	const { setCurrentCategory } = useCurrentCategoryContext();

	useEffect(() => {
		if (currentCategory) {
			setCategory(currentCategory)
		} else if (categoryId) {
			getCategoryById(categoryId)
				.then(category => {
					setCategory(category)
					setCurrentCategory(category)
				});
		}
	}, [categoryId, currentCategory]);


	return (
		<div className="categories-container">
			{category ? (
				<CategoryDetail categoryId={category.id!} categoryType={category.type} />
			) : (
				<LoadingScreen/>
			)}
		</div>
	);
};
