import React, { useRef, useState } from 'react';
import { ItemTypes, MoviesItemTypes, SeriesItemTypes } from '../../types/types';
import { Modal } from '../modal/modal';
import { UpdateOtherItemForm } from '../Forms/UpdateItems/UpdateOtherItemForm/UpdateOtherItemForm';
import { deleteItem, updateItem } from '../../services/firebase';
import { UpdateMovieItemForm } from '../Forms/UpdateItems/UpdateMovieItemForm/UpdateMovieItemForm';
import { UpdateSeriesItemForm } from '../Forms/UpdateItems/UpdateSeriesItemForm/UpdateSeriesItemForm';
import { ItemName } from './ItemName/ItemName';
import { ItemNotes } from './ItemNotes/ItemNotes';
import { ItemFromMinute } from './ItemFromMinute/ItemFromMinute';
import { ItemSeasonEpisode } from './ItemSeasonEpisode/ItemSeasonEpisode';
import { ItemOptions } from './ItemOptions/ItemOptions';
import './Item.scss';
import { useMountingEffect } from '../../Hooks/useMountingEffect';
import { useDataContext } from '../../context/DataContext';
import { MoveItemForm } from '../Forms/MoveItemForm/MoveItemForm';

interface ItemProps {
    item: ItemTypes;
	mountingAnimation?: boolean;
}

export const Item: React.FC<ItemProps> = (props) => {
	const {item} = props
	const [openUpdateItemModal , setOpenUpdateItemModal] = useState<boolean>(false);
	const [openMoveItemModal , setOpenMoveItemModal] = useState<boolean>(false);
	const isMounted: boolean = useMountingEffect();
	const [isDeleting , setIsDeleting] = useState<boolean>(false);
	const {setChangesSaved} = useDataContext();
	const itemRef = useRef(null);

	const handleOpenUpdateItemModal = () => {
        setOpenUpdateItemModal(true);
    };
    const handleCloseUpdateItemModal = () => {
        setOpenUpdateItemModal(false);
    };

	const handleOpenMoveItemModal = () => {
        setOpenMoveItemModal(true);
    };
    const handleCloseMoveItemModal = () => {
        setOpenMoveItemModal(false);
    };


	const modifyItem = async(updatedItemData: Partial<ItemTypes>)=>{
		if (item.id) {
			setChangesSaved(false);
			await updateItem(item.id, updatedItemData);
			setChangesSaved(true);
		}
	}

	const updateItemStates = async(propName: keyof ItemTypes) => {
		setChangesSaved(false);
		if (item.id) {
			const updatedItemData = {[propName]: !item[propName]};
			await updateItem(item.id, updatedItemData);
		}
		setChangesSaved(true);
	}

	const handleDeleteItem = async()=> {
		setChangesSaved(false);
		setIsDeleting(true);
		setTimeout(async()=> {
			if (item.id) {
				await deleteItem(item.id);
				setChangesSaved(true);
			}
		}, 225)
	}

	const itemOptionsProps = {
		item,
		updateItemStates,
		deleteItem: handleDeleteItem,
		handleOpenMoveItemModal: handleOpenMoveItemModal
    }

	const updateItemFormProps = {
		item,
		onSubmit: modifyItem,
		onClose: handleCloseUpdateItemModal
	}

	const moveItemFormProps = {
		item,
		onSubmit: modifyItem,
		onClose: handleCloseMoveItemModal
	}

	return (
		<>
			<div className={
					`item 
					${item.type === 'Movies' ? 'movie-type' : (item.type === 'Series' ? 'series-type' : (''))}
					${isMounted ? '' : 'mounting'}
					${isDeleting ? 'deleting' : ''}`
				}
				onClick={handleOpenUpdateItemModal}
				ref={itemRef}
			>

				{item.type === 'Others' ? (
					<>
						<ItemName name={item.name}/>
						<ItemNotes notes={item.notes}/>
						<ItemOptions {...itemOptionsProps}/>
					</>
					
				) : item.type === 'Movies' ? (
					<>
						<ItemName name={item.name}/>
						<ItemFromMinute minute={(item as MoviesItemTypes).minute} />
						{ item.notes !== "" && <ItemNotes notes={item.notes}/>}
						<ItemOptions {...itemOptionsProps}/>
					</>
				) : (
					<>
						<ItemName name={item.name}/>
						<ItemSeasonEpisode season={(item as SeriesItemTypes).season} episode={(item as SeriesItemTypes).episode} />
						{ item.notes !== "" && <ItemNotes notes={item.notes}/>}
						<ItemOptions {...itemOptionsProps}/>
					</>
				)}

			</div>

			<Modal onClose={handleCloseUpdateItemModal} open={openUpdateItemModal}>
				{item && (
					item.type === 'Others' ? (
						<UpdateOtherItemForm {...updateItemFormProps}/>
					) : item.type === 'Movies' ? (
						<UpdateMovieItemForm {...updateItemFormProps}/>
					) : (
						<UpdateSeriesItemForm {...updateItemFormProps}/>
					)
				)}
			</Modal>

			<Modal onClose={handleCloseMoveItemModal} open={openMoveItemModal} >
                <MoveItemForm {...moveItemFormProps}/>
            </Modal>  
			
		</>
	);
};



