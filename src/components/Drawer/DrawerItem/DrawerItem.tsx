import { useState } from 'react';
import { ItemTypes, MoviesItemTypes, OthersItemTypes, SeriesItemTypes } from '../../../types/types'
import './DrawerItem.scss'
import { Modal } from '../../modal/modal';
import { UpdateOtherItemForm } from '../../Forms/UpdateItems/UpdateOtherItemForm/UpdateOtherItemForm';
import { UpdateMovieItemForm } from '../../Forms/UpdateItems/UpdateMovieItemForm/UpdateMovieItemForm';
import { UpdateSeriesItemForm } from '../../Forms/UpdateItems/UpdateSeriesItemForm/UpdateSeriesItemForm';
import { useDataContext } from '../../../context/DataContext';
import { updateItem } from '../../../services/firebase';

interface DraweItemTypes {
    item: ItemTypes;
}

export const DrawerItem: React.FC<DraweItemTypes> = ({item}) => {
	const [openModal , setOpenModal] = useState<boolean>(false);
    const {setChangesSaved} = useDataContext();

	const handleOpenModal = () => {setOpenModal(true)}
    const handleCloseModal = () => {setOpenModal(false)}

    const modifyItem = async(updatedItemData: Partial<ItemTypes>)=>{
		if (item.id) {
			setChangesSaved(false);
			await updateItem(item.id, updatedItemData);
			setChangesSaved(true);
		}
	}

    const formProps = {
		item,
		onSubmit: modifyItem,
		onClose: handleCloseModal,
		openModal
	}
    
    return (
        <>
            <div className='drawer-item' onClick={handleOpenModal}>
                <div className='drawer-item__name item-row'>
                    {item.name}
                </div>
                {   
                    item.type === 'Series' ? (
                        <div className='drawer-item__item-row__series'>
                            <p className='item-row-info'>
                                Season {(item as SeriesItemTypes).season}
                                </p>
                            <p className='item-row-info'>
                                Episode {(item as SeriesItemTypes).episode}
                                </p>
                        </div>

                    ) : item.type === 'Movies' ? (
                        <div className='drawer-item__item-row__movie'>
                            <p className='item-row-info'>
                                From minute {(item as MoviesItemTypes).minute}
                            </p>
                        </div>

                    ) : (
                        <div className='drawer-item__item-row__other' onClick={handleOpenModal} >
                            <p className='item-row-info'>
                                {(item as OthersItemTypes).notes}
                            </p>
                        </div>
                    )
                }
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
    )
}