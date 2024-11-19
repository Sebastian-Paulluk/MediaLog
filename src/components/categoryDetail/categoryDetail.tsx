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

interface CategoryDetailTypes {
	category: CategoryTypes;
} 

export const CategoryDetail: React.FC<CategoryDetailTypes> = ({ category }) => {
	const {items, getItemsByCategoryId} = useDataContext();
	const [updatedItems, setUpdatedItems] = useState<ItemTypes[]>([]);
	const [openModal, setOpenModal] = useState(false);
	const {setChangesSaved} = useDataContext();

	const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

	useEffect(() => {
		if (category.id) {
			const itemsOfCategory = getItemsByCategoryId(category.id)
			setUpdatedItems(itemsOfCategory)
		}
	}, [items]);

	
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
		itemType: category.type,
		onSubmit: handleAddItem,
		onClose: handleCloseModal,
	}

	return (
		<div className="category-detail">
			<div className='add-item-button-container'>
				<button className='add-item-button' onClick={handleOpenModal}>+</button>
			</div>

			<CategoryDetailUncompletedItems {...uncompletedItemProps} />
			<CategoryDetailCompletedItems {...completedItemProps} />

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
};

