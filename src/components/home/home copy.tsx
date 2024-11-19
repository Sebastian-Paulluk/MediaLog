import { Category } from './category/category';
import './home.scss';
import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories } from '../../services/firebase';
import { CategoryTypes } from '../../types/types';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { Spin } from 'antd';
import { AddCategoryModal } from './addCategoryModal/addCategoryModal';
import { useCurrentCategoryContext } from '../../context/categoryContext';

export const Home = () => {
	const [categories, setCategories] = useState<CategoryTypes[]>([]);
	const [categoriesLoaded, setCategoriesLoaded] = useState(false);
	const [newCategoryLoading, setNewCategoryLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const {setCurrentCategory} = useCurrentCategoryContext();

	useEffect(() => {
		setCurrentCategory(null);
		getCategories().then( categories => {
			setCategories(categories)
			setCategoriesLoaded(true)
		})
	}, []);

	const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

	const handleAddCategory = async (newCategory: Omit<CategoryTypes, 'id'>) => { 
		setNewCategoryLoading(true);
		const newCategoryId = await createCategory(newCategory);
		const createdCategory = { id: newCategoryId, ...newCategory };
		setCategories((prevCategories) => [...prevCategories, createdCategory]);
		setNewCategoryLoading(false);
	};

	const handleDeleteCategory =async(categoryId: string)=>{
		await deleteCategory(categoryId)
		setCategories((prevCategories) => prevCategories.filter(cat => cat.id !== categoryId));
	}

	return (
		<div className="home">
			{categoriesLoaded ? (
				<>
					<div className="add-category-btn" onClick={handleOpenModal}>
						<p>+</p>
					</div>
					{newCategoryLoading && (
						<div className="creating-category">
							<Spin size="large" /> 
						</div>
					)}
					{categories.map((category, index) => {
						return <Category key={index} category={category} deleteCategory={handleDeleteCategory}/>;
					})}
				</>
			) : (
				<LoadingScreen />
			)}
			<AddCategoryModal onClose={handleCloseModal} open={openModal} onSubmit={handleAddCategory} />
		</div>
	);
};


