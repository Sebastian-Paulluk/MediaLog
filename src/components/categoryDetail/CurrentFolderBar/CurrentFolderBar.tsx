import { useParams } from 'react-router-dom'
import './CurrentFolderBar.scss'
import { useDataContext } from '../../../context/DataContext';
import arrowImg from '../../../assets/images/arrow-2.png';
import normalizeText from '../../../utils/normalizeText';
import folderImg from '../../../assets/images/folder.png';

interface CurrentFolderBarTypes {
    openFoldersMenu: boolean | null;
    handleToggleOpenFoldersMenu: ()=> void;
}

export const CurrentFolderBar: React.FC<CurrentFolderBarTypes> = ({handleToggleOpenFoldersMenu, openFoldersMenu}) => {
    const {getFolderById, getItemsByCategoryIdInRoot, getItemsByFolderId} = useDataContext();
    const {categoryId, folderId} = useParams();

    const getCurrentFolderName =()=>{
        if (categoryId && folderId) {
            const folder = getFolderById(folderId);
            return folder.name;
        }
        return 'Root';
    }

    const getItemsInRoot =()=> categoryId ? getItemsByCategoryIdInRoot(categoryId).length : 0;
    const getItemsInFolder =()=> folderId ? getItemsByFolderId(folderId).length : 0;

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
                                ${getCurrentFolderName() !== 'Root' ? 'not-root' : ''}`
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
                                        {getItemsInRoot()}
                                    </div>
                                </div>

                                <div className='fc__ghost-folder-container'>
                                    <img
                                        src={folderImg}
                                        className='fc__ghost-folder-container__img'
                                        alt='ghost-folder-img'
                                    />
                                    <div className='fc__ghost-folder-container__number'>
                                        {getItemsInFolder()}
                                    </div>
                                </div>
                                
                            </div>
                        
                        </div>
                    </div>

                    <div className='cf-bar__content__body__center'>

                        <div className='cf-bar__content__body__center__cf-name' >
                            {normalizeText.firstLetterCaps( getCurrentFolderName() )}
                        </div>
                    </div>

                    <div className='cf-bar__content__body__right'>

                    </div>
                </div>

            </div>
        </div>
    )
}