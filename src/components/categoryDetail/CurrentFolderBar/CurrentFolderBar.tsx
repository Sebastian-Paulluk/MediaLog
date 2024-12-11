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
    const {getFolderById, getFoldersByCategoryId} = useDataContext();
    const {categoryId, folderId} = useParams();

    const getCurrentFolderName =()=>{
        if (categoryId && folderId) {
            const folder = getFolderById(folderId);
            return folder.name;
        }
        return 'Root';
    }

    const getFoldersInCategory =()=> categoryId ? getFoldersByCategoryId(categoryId).length : 0;

    return (
        <div className='cf-bar'>
            <div className='cf-bar__content'>

                <div className='cf-bar__content__body'>

                    <div className='cf-bar__content__body__left' onClick={handleToggleOpenFoldersMenu}>
                        <div className='cf-bar__content__body__left__open-folders-button'>
                            <div className='cf-bar__content__body__left__open-folders-button__img-container'>
                                <img
                                    src={arrowImg}
                                    alt='arrow'
                                    className={
                                        `cf-bar__content__body__left__open-folders-button__img-container__img
                                        ${openFoldersMenu ? 'open-cf-bar': ''}`
                                    } 
                                />
                            </div>
                            <div className='cf-bar__content__body__left__open-folders-button__folders-text'>
                                Folders
                            </div>
                        </div>

                        <div className='cf-bar__content__body__left__cf-text'>
                            Current
                            <span className='cf-bar__content__body__left__cf-text__folder'>
                                folder
                            </span>
                            :  
                        </div>
                    </div>

                    <div className='cf-bar__content__body__center'>

                        <div className='cf-bar__content__body__center__cf-name'>
                            {normalizeText.firstLetterCaps( getCurrentFolderName() )}
                        </div>
                    </div>

                    <div className='cf-bar__content__body__right'>
                        <div className='cf-bar__content__body__right__folder-count'>
                            <div className='cf-bar__content__body__right__folder-count__img-container'>
                                <img src={folderImg} className='cf-bar__content__body__right__folder-count__img-container__img' alt='folder-img' />
                            </div>
                            <div className='cf-bar__content__body__right__folder-count__number'>
                                {getFoldersInCategory()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}