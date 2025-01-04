import { useEffect, useState } from 'react';
import './CategoriesContainer.scss';
import { useParams } from 'react-router-dom';
import { CategoryDetail } from '../categoryDetail/categoryDetail';
import { CategoryTypes } from '../../types/types';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { useCurrentCategoryContext } from '../../context/categoryContext';
import { useDataContext } from '../../context/DataContext';

export const CategoriesContainer = () => {
	const { categoryId } = useParams<{ categoryId: string }>();
	const [ category, setCategory ] = useState<CategoryTypes | null>(null);
	const { setCurrentCategory } = useCurrentCategoryContext();
	const { getCategoryById, dataLoaded } = useDataContext();
	const {categories} = useDataContext();
	
	useEffect(() => {
		if (categoryId) {
			if (dataLoaded) {
				const category = getCategoryById(categoryId)
				setCategory(category)
				setCurrentCategory(category)
			}
		}
	}, [dataLoaded, categories]);


	return (
		<div className="categories-container">
			{category ? (
				<CategoryDetail category={category} />
			) : (
				<LoadingScreen size={'large'} />
			)}
		</div>
	);
};
