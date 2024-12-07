import { useParams } from 'react-router-dom'
import './CurrentFolderBar.scss'
import { useDataContext } from '../../../context/DataContext';
import arrowImg from '../../../assets/images/arrow-2.png';

interface CurrentFolderBarTypes {
    openFoldersMenu: boolean | null;
    handleToggleOpenFoldersMenu: ()=> void;
}

export const CurrentFolderBar: React.FC<CurrentFolderBarTypes> = ({handleToggleOpenFoldersMenu, openFoldersMenu}) => {
    const {getFolderById} = useDataContext();
    const {categoryId, folderId} = useParams();

    const getCurrentFolderName =()=>{
        if (categoryId && folderId) {
            const folder = getFolderById(folderId);
            return folder.name;
        }
        return 'Root';
    }

    return (
        <div className='cf-bar'>
            <div className='cf-bar__content'>

                <div className='cf-bar__content__body'>

                    <div className='cf-bar__content__body__left' onClick={handleToggleOpenFoldersMenu}>
                        <div className='cf-bar__content__body__left__img-container'>
                            <img
                                src={arrowImg}
                                alt='arrow'
                                className={
                                    `cf-bar__content__body__left__img-container__img
                                    ${openFoldersMenu ? 'open-cf-bar': ''}`
                                } 
                            />
                        </div>
                        <div className='cf-bar__content__body__left__folders-text'>
                            Folders
                        </div>
                    </div>

                    <div className='cf-bar__content__body__right'>
                        <div className='cf-bar__content__body__right__cf-text'>
                            Current folder:
                        </div>
                        <div className='cf-bar__content__body__right__cf-name'>
                            {getCurrentFolderName()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}