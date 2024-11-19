import './categoryDetail.scss';
import { ItemTypes } from '../../types/types';
import { createItem, deleteItem, getItemsByCategory } from '../../services/firebase';
import React, { useEffect, useState } from 'react';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { AddOtherItemForm } from '../Forms/AddItems/addOtherItemForm/addOtherItemForm';
import { AddMovieItemForm } from '../Forms/AddItems/addMoviesItemsForm/addMovieItemForm';
import { Modal } from '../modal/modal';
import { AddSeriesItemForm } from '../Forms/AddItems/AddSeriesItemForm/AddSeriesItemForm';
import { CategoryDetailUncompletedItems } from './CategoryDetailUncompletedItems/CategoryDetailUncompletedItems';
import { CategoryDetailCompletedItems } from './CategoryDetailCompletedItems/CategoryDetailCompletedItems';

interface CategoryDetailTypes {
	categoryId: string
	categoryType: string
} 

export const CategoryDetail: React.FC<CategoryDetailTypes> = ({ categoryId, categoryType }) => {
	const [openModal, setOpenModal] = useState(false);
	const [items, setItems] = useState<ItemTypes[]>([])
	const [itemsLoaded , setItemsLoaded] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false)

	const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

	useEffect(() => {
		if (categoryId) {
			getItemsByCategory(categoryId)
				.then( res => {
					setItems(res)
					setItemsLoaded(true)
				})
			}
	}, []);



	const handleUpdateItem = (updatedItemData: Partial<ItemTypes>) => {
		setItems((prevItems) =>
			prevItems.map(item =>
				item.id === updatedItemData.id ? { ...item, ...updatedItemData } : item
			)
		);
	};

	const toggleItemStates = (itemId: string, prop: keyof ItemTypes) => {
		setItems((prevItems) =>
			prevItems.map(item =>
				item.id === itemId ? { 
					...item,
					[prop]: !item[prop],
					...(prop === 'completed' ? {changedCompletedState: true} : {})
				 } : item
			)
		);
	};
	
	const handleAddItem = async (newItem: ItemTypes) => {
		if (categoryId) {
			setNewItemLoading(true);
			const newItemId = await createItem(newItem);
			const createdItem = { id: newItemId, ...newItem, isNew: true }; 
			setItems((prevItems) => [createdItem, ...prevItems]);
			setNewItemLoading(false);
		}
	};

	const handleDeleteItem = async(itemId: string)=>{
		await deleteItem(itemId);
		setItems((prevItems) => {
			const itemsFiltrados = prevItems.filter(item => String(item.id) !== itemId)
			return itemsFiltrados
		});
	};


	const uncompletedItemProps = {
		newItemLoading,
		handleUpdateItem,
		handleDeleteItem,
		toggleItemStates,
		items: items.filter(item => item.completed === false)
	}

	const completedItemProps = {
		...uncompletedItemProps,
		items: items.filter(item => item.completed === true)
	}

	const formsProps = {
		categoryId,
		itemType: categoryType,
		onSubmit: handleAddItem,
		onClose: handleCloseModal,
	}

	return (
		<div className="category-detail">
			{itemsLoaded ? (
					<>
						<div className='add-item-button-container'>
							<button className='add-item-button' onClick={handleOpenModal}>+</button>
						</div>

						<CategoryDetailUncompletedItems {...uncompletedItemProps} />
						<CategoryDetailCompletedItems {...completedItemProps} />

						<Modal onClose={handleCloseModal} open={openModal} >
							{categoryId && (
								categoryType === 'Others' ? (
									<AddOtherItemForm {...formsProps}/>
								) : categoryType === 'Movies' ? (
									<AddMovieItemForm {...formsProps}/>
								) : (
									<AddSeriesItemForm {...formsProps}/>
								)
							)}
						</Modal>
					</>
				) : (
					<LoadingScreen />
				)
			}
		</div>
	);
};

