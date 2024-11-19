import { categoriesData } from './categories';

const getData = () => {
	return categoriesData;
};

const getCategoryById = (categoryId: number) => {
	const category = categoriesData.find(
		(category) => category.id === categoryId
	);
	return category || null;
};

export { getData, getCategoryById };
