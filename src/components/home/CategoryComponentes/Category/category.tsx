import { Link } from 'react-router-dom';
import './category.scss';
import { CategoryTypes } from '../../../../types/types';
import normalizeText from '../../../../utils/normalizeText';
import { useCurrentCategoryContext } from '../../../../context/categoryContext';
import React, { useState } from 'react';
import { AlertDialog } from '../../../AlertDialog/AlertDialog';
import { PopMenu } from '../../../PopMenu/PopMenu';
import { EditCategoryForm } from '../../../Forms/EditCategoryForm/EditCategoryForm';
import { Modal } from '../../../modal/modal';
import { useDataContext } from '../../../../context/DataContext';
import { updateCategory } from '../../../../services/firebase';
import listImg from '../../../../assets/images/list.png';
import folderImg from '../../../../assets/images/folder-white.png';
import settingsImg from '../../../../assets/images/settings-2.png';

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
	const {getFoldersByCategoryId, getItemsByCategoryId } = useDataContext();
	const {setChangesSaved} = useDataContext();

	const getItemsInCategory =()=> category.id ? getItemsByCategoryId(category.id).length : 0;
    const getFoldersQuantity =()=> category.id ? getFoldersByCategoryId(category.id).length : 0;

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
		],
	}




	return (

		<div className={`category-container ${isDeleting ? 'deleting' : ''}`}>
			<Link to={`/category/${category.id}`} onClick={handleSelectCategory}>
				<div className='category'>
					<div className='top-side'>
						<p className="category-title">{normalizedCategoryName}</p>

					</div>
					<div className='bottom-side'>
						<div className='bottom-side__items'>
							{getItemsInCategory()}
							<img src={listImg} className='bottom-side__items__img' alt='list-img' />
						</div>
						<div className='bottom-side__folders'>
							{getFoldersQuantity()}
							<img src={folderImg} className='bottom-side__folders__img' alt='list-img' />
						</div>
					</div>
				</div>
			</Link>

			<PopMenu {...{ ...popMenuProps, vertical: 'bottom' as 'bottom' }}>
				<button className='category-options-button'>
					<img src={settingsImg} alt='settings' className='category-options-button__img' />
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
