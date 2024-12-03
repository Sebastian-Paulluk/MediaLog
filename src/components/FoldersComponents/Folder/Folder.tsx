import './Folder.scss'
import folderImg from '../../../assets/images/folder.png';
import { FolderTypes } from '../../../types/types';

interface FolderProps {
    folder: FolderTypes;
}

export const Folder: React.FC<FolderProps> = ({folder}) => {

    console.log(folder)
    

    return (
        <div className='folder'>
            <span className='folder__lines'></span>

            <div className='folder__details'>
                <div className='folder__details__img-container'>
                    <img src={folderImg} alt='folder-img' className='folder-img'/>
                </div>
                <div className='folder__details__name-container'>
                    <div className='folder__details__name-container__name'>
                        {folder.name}
                    </div>
                </div>
            </div>
            
        </div>
    )
}