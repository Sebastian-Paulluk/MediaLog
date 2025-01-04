import { useParams } from 'react-router-dom'
import './CurrentFolderBar.scss'
import { useDataContext } from '../../../context/DataContext';
import arrowImg from '../../../assets/images/arrow-2.png';
import normalizeText from '../../../utils/normalizeText';
import folderImg from '../../../assets/images/folder.png';
import listImg from '../../../assets/images/list.png';

interface CurrentFolderBarTypes {
    openFoldersMenu: boolean | null;
    handleToggleOpenFoldersMenu: ()=> void;
}

export const CurrentFolderBar: React.FC<CurrentFolderBarTypes> = ({handleToggleOpenFoldersMenu, openFoldersMenu}) => {
    const {getFoldersByCategoryId, getFolderById, getItemsByCategoryIdInRoot, getItemsByFolderId, getCategoryById} = useDataContext();
    const {categoryId, folderId} = useParams();

    const getCurrentFolderName =()=>{
        if (categoryId && folderId) {
            const folder = getFolderById(folderId);
            return folder.name;
        }
        if (categoryId) {
            const category = getCategoryById(categoryId);
            return category.name;
        }
    }

    const getItemsInRoot =()=> categoryId ? getItemsByCategoryIdInRoot(categoryId).length : 0;
    const getItemsInFolder =()=> folderId ? getItemsByFolderId(folderId).length : 0;
    const getFoldersQuantity =()=> categoryId ? getFoldersByCategoryId(categoryId).length : 0;

    return (
        <div className='cf-bar'>
            <div className='cf-bar__content'>

                <div className='cf-bar__content__body'>

                    <div className='cf-bar__content__body__left' onClick={handleToggleOpenFoldersMenu}>
                        <div className='cf-bar__content__body__left__open-folders-button'>
                            <div className='cf-bar__content__body__left__open-folders-button__arrow-img-container'>
                                <img
                                    src={arrowImg}
                                    alt='arrow'
                                    className={
                                        `cf-bar__content__body__left__open-folders-button__arrow-img-container__img
                                        ${openFoldersMenu ? 'open-cf-bar': ''}`
                                    } 
                                />
                            </div>

                            <div className={
                                `cf-bar__content__body__left__open-folders-button__folder-count
                                ${folderId ? 'not-root' : ''}`
                            }>
                                <div className='fc__main-folder'>
                                    <div className='fc__main-folder__img-container'>
                                        <img
                                            src={folderImg}
                                            className='fc__main-folder__img-container__img'
                                            alt='folder-img'
                                        />
                                    </div>
                                    <div className='fc__main-folder__number'>
                                        {getFoldersQuantity()}
                                    </div>
                                </div>

                                <div className='fc__ghost-folder-container'>
                                    <img
                                        src={folderImg}
                                        className='fc__ghost-folder-container__img'
                                        alt='ghost-folder-img'
                                    />

                                </div>
                                
                            </div>
                        
                        </div>
                    </div>

                    <div className='cf-bar__content__body__center'>

                        <div className='cf-bar__content__body__center__cf-name' >
                            {normalizeText.firstLetterCaps( getCurrentFolderName()! )}
                        </div>
                    </div>

                    <div className='cf-bar__content__body__right'>

                        {folderId ? getItemsInFolder() : getItemsInRoot()}
                        <div className='cf-bar__content__body__right__img-container'>
                            <img src={listImg} alt='list-img' className='cf-bar__content__body__right__img-container__img' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}