import React, { useState } from 'react';
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

interface ItemProps {
    item: ItemTypes;
	isNew?: boolean;
	changedCompletedState?: boolean;
	mountingAnimation?: boolean;
}

export const Item: React.FC<ItemProps> = (props) => {
	const {item, isNew=false, changedCompletedState=false} = props
	const [openModal , setOpenModal] = useState<boolean>(false);
	const isMounted: boolean = useMountingEffect();
	const {setChangesSaved} = useDataContext();

	const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }


	const modifyItem = async(updatedItemData: Partial<ItemTypes>)=>{
		if (item.id) {
			setChangesSaved(false);
			await updateItem(item.id, updatedItemData);
			setChangesSaved(true);
		}
	}

	const updateItemStates = async(propName: keyof ItemTypes) => {
		if (item.id) {
			setChangesSaved(false);
			const updatedItemData = {[propName]: !item[propName]};
			await updateItem(item.id, updatedItemData);
			setChangesSaved(true);
		}
	}

	const handleDeleteItem = async()=> {
		if (item.id) {
			setChangesSaved(false);
			await deleteItem(item.id);
			setChangesSaved(true);
		}
	}

	const itemOptionsProps = {
		favorite: item.favorite,
		completed: item.completed,
		updateItemStates,
		deleteItem: handleDeleteItem
    }

	const formProps = {
		item,
		onSubmit: modifyItem,
		onClose: handleCloseModal,
		openModal
	}


	return (
		<>
			<div className={
					`item 
					${ isMounted ? '' : isNew ? 'firstTimeMounting' : 'mounting' }
					${ changedCompletedState ? 'changedCompletedState' : '' }
					`
				}
				onClick={handleOpenModal}
			>

				{item.type === 'Others' ? (
					<>
						<ItemName name={item.name}/>
						{ item.notes !== "" && <ItemNotes notes={item.notes}/>}
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

			<Modal onClose={handleCloseModal} open={openModal}>
				{item && (
					item.type === 'Others' ? (
						<UpdateOtherItemForm {...formProps}/>
					) : item.type === 'Movies' ? (
						<UpdateMovieItemForm {...formProps}/>
					) : (
						<UpdateSeriesItemForm {...formProps}/>
					)
				)}
			</Modal>
		</>
	);
};



