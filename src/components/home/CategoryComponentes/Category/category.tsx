import { Link } from 'react-router-dom';
import './category.scss';
import { CategoryTypes } from '../../../../types/types';
import normalizeText from '../../../../utils/normalizeText';
import { useCurrentCategoryContext } from '../../../../context/categoryContext';
import { Dots } from '../Dots/Dots';
import React, { useState } from 'react';
import { AlertDialog } from '../../../AlertDialog/AlertDialog';
import { PopMenu } from '../../../PopMenu/PopMenu';
import { EditCategoryForm } from '../../../Forms/EditCategoryForm/EditCategoryForm';
import { Modal } from '../../../modal/modal';
import { useDataContext } from '../../../../context/DataContext';
import { updateCategory } from '../../../../services/firebase';


type CategoryProps = {
	category: CategoryTypes;
	deleteCategory: (categoryId: string) => void;
	isDeleting: boolean;
};


export const Category = ({ category, deleteCategory, isDeleting }: CategoryProps) => {
	const normalizedCategoryName = normalizeText.firstLettersCaps(category.name)
	const { setCurrentCategory } = useCurrentCategoryContext();
	const [openDialog, setOpenDialog] = React.useState(false);
	const [openEditCategoryModal , setOpenEditCategoryModal] = useState<boolean>(false);
	const {setChangesSaved} = useDataContext();

	const handleOpenUpdateItemModal = () => {
		setOpenEditCategoryModal(true);
	};
	const handleCloseUpdateItemModal = () => {
		setOpenEditCategoryModal(false);
	};
	const handleEditCategory = async(updatedCategoryData: Partial<CategoryTypes>) =>{
		if (category.id) {
			setChangesSaved(false);
			await updateCategory(category.id, updatedCategoryData);
			setChangesSaved(true);
		}
	}
	

	const handleSelectCategory =()=>{
		setCurrentCategory(category)
	}

	const handleDeleteCategory = async()=>{
		if (category.id) {
			deleteCategory(category.id)
		}
	}

	const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

	const editCategoryFormProps = {
		category,
		onSubmit: handleEditCategory,
		onClose: handleCloseUpdateItemModal
	}

	const popMenuProps = {
		options: [
			{name: 'Edit name', icon: 'edit', onClick: handleOpenUpdateItemModal},
			{name: 'Delete', icon: 'delete', onClick: handleClickOpenDialog},
		]
	}

	return (

		<div className={`category-container ${isDeleting ? 'deleting' : ''}`}>
			<Link to={`/category/${category.id}`} onClick={handleSelectCategory}>
				<div className='category'>
						<div className='top-side'>
							
						</div>
						<div className='bottom-side'>
							<p className="category-title">{normalizedCategoryName}</p>
						</div>
				</div>
			</Link>

			<PopMenu {...popMenuProps}>
				<button className='category-options-button'>
					<Dots />
				</button>
			</PopMenu>

			<AlertDialog
				title='Delete category?'
				text='This will erase all the folders and items associated with this category as well'
				open={openDialog}
				setOpen={setOpenDialog}
				handleConfirmAction={handleDeleteCategory}
			/>

			<Modal onClose={handleCloseUpdateItemModal} open={openEditCategoryModal} >
				<EditCategoryForm {...editCategoryFormProps}/>
			</Modal>  
			
		</div>

	);
};
