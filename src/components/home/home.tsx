import { Category } from './CategoryComponentes/Category/category';
import './home.scss';
import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, deleteFoldersByCaregoryId, deleteItemsByCategoryId } from '../../services/firebase';
import { CategoryTypes } from '../../types/types';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { AddCategoryModal } from './addCategoryModal/addCategoryModal';
import { useCurrentCategoryContext } from '../../context/categoryContext';
import { useDataContext } from '../../context/DataContext';
import { LatestUpdates } from '../LastestUpdates/LatestUpdates';

export const Home = () => {
	const {categories, dataLoaded, setChangesSaved} = useDataContext();
	const [openModal, setOpenModal] = useState(false);
	const {setCurrentCategory} = useCurrentCategoryContext();
	const [categoryDeletingId , setCategoryDeletingId] = useState<string>(''); 

	useEffect(() => {
		setCurrentCategory(null);
	}, []);

	const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

	const handleAddCategory = async (newCategory: Omit<CategoryTypes, 'id'>) => { 
		setChangesSaved(false);
		await createCategory(newCategory);
		setChangesSaved(true);
	};

	const handleDeleteCategory =async(categoryId: string)=>{
		setChangesSaved(false);
		setCategoryDeletingId(categoryId);
		await deleteItemsByCategoryId(categoryId);
		await deleteCategory(categoryId);
		await deleteFoldersByCaregoryId(categoryId);
		setCategoryDeletingId('');
		setChangesSaved(true);
	};
	
	return (
		<div className="home">
			{dataLoaded ? (
				<>
					<LatestUpdates />
					<div className='categories-container'>
						<div className="add-category-btn" onClick={handleOpenModal}>
							<p>+</p>
						</div>

						{categories.map((category, index) => {
							return (
								<Category
									key={index}
									category={category}
									deleteCategory={handleDeleteCategory}
									isDeleting={categoryDeletingId === category.id}
								/>
							);
						})}
					</div>
				</>
				
			) : (
				<LoadingScreen />
			)}
			<AddCategoryModal onClose={handleCloseModal} open={openModal} onSubmit={handleAddCategory} />
		</div>
	);
};


