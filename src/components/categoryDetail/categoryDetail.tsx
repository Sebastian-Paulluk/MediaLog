import './categoryDetail.scss';
import { CategoryTypes, ItemTypes } from '../../types/types';
import { createItem } from '../../services/firebase';
import React, { useEffect, useState } from 'react';
import { AddOtherItemForm } from '../Forms/AddItems/addOtherItemForm/addOtherItemForm';
import { AddMovieItemForm } from '../Forms/AddItems/addMoviesItemsForm/addMovieItemForm';
import { Modal } from '../modal/modal';
import { AddSeriesItemForm } from '../Forms/AddItems/AddSeriesItemForm/AddSeriesItemForm';
import { CategoryDetailUncompletedItems } from './CategoryDetailUncompletedItems/CategoryDetailUncompletedItems';
import { CategoryDetailCompletedItems } from './CategoryDetailCompletedItems/CategoryDetailCompletedItems';
import { useDataContext } from '../../context/DataContext';
import { FoldersContainer } from '../FoldersComponents/FoldersContainer/FoldersContainer';
import { useParams } from 'react-router-dom';
import { CurrentFolderBar } from './CurrentFolderBar/CurrentFolderBar';

interface CategoryDetailTypes {
	category: CategoryTypes;
} 

export const CategoryDetail: React.FC<CategoryDetailTypes> = ({ category }) => {
	const {folderId} = useParams();
	const {items, getItemsByCategoryIdInRoot, getItemsByFolderId} = useDataContext();
	const [updatedItems, setUpdatedItems] = useState<ItemTypes[]>([]);
	const [openModal, setOpenModal] = useState(false);
	const {setChangesSaved} = useDataContext();
    const [openFoldersMenu , setOpenFoldersMenu] = useState<boolean>(false);

    const handleToggleOpenFoldersMenu =()=> {
		setOpenFoldersMenu(!openFoldersMenu);
    }

	const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

	useEffect(() => {
		if (category.id) {
			if (folderId) {
				const itemsOfFolder = getItemsByFolderId(folderId)
				setUpdatedItems(itemsOfFolder);
			} else {
				const itemsOfCategory = getItemsByCategoryIdInRoot(category.id)
				setUpdatedItems(itemsOfCategory);
			}
		}
	}, [items, folderId, category.id]);
	
	const handleAddItem = async (newItem: ItemTypes) => {
		if (category.id) {
			setChangesSaved(false);
			await createItem(newItem);
			setChangesSaved(true);
		}
	};

	const uncompletedItemProps = {
		items: updatedItems.filter(item => item.completed === false)
	}

	const completedItemProps = {
		items: updatedItems.filter(item => item.completed === true)
	}

	const formsProps = {
		categoryId: category.id as string,
		folderId: folderId ? folderId : "",
		itemType: category.type,
		onSubmit: handleAddItem,
		onClose: handleCloseModal,
	}

	return (
		<div className="cd">
			<CurrentFolderBar
				handleToggleOpenFoldersMenu={handleToggleOpenFoldersMenu}
				openFoldersMenu={openFoldersMenu}
			/>
	
			<div className="cd__body"> 

				<FoldersContainer
					category={category}
					setOpenFoldersMenu={setOpenFoldersMenu}
					openFoldersMenu={openFoldersMenu}
				/>
	
				<div className='cd__body__items-content'>
					<div className={`add-item-button-container ${openFoldersMenu ? 'align-left' : ''}`}>
						<button className='add-item-button' onClick={handleOpenModal}>+</button>
					</div>

					<CategoryDetailUncompletedItems {...uncompletedItemProps} />
					<CategoryDetailCompletedItems {...completedItemProps} />

					<div
						className={`cd__body__items-content__cover ${openFoldersMenu ? 'active' : ''}`}
						onClick={handleToggleOpenFoldersMenu}
					/>
				</div>
	
				<div className='cd__body__right' ></div>
			</div>
	
			<Modal onClose={handleCloseModal} open={openModal} >
				{category.id && (
					category.type === 'Others' ? (
						<AddOtherItemForm {...formsProps}/>
					) : category.type === 'Movies' ? (
						<AddMovieItemForm {...formsProps}/>
					) : (
						<AddSeriesItemForm {...formsProps}/>
					)
				)}
			</Modal>

		</div>
	);
}