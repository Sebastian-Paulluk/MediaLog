import './UserButton.scss';
import arrowImg from '../../../assets/images/arrow-down-filled.png';
import { Dropdown, MenuProps } from 'antd';
import { useUserContext } from '../../../context/userContext';

interface UserButtonTypes {
    handleUserLogout: ()=> void;
}

export const UserButton: React.FC<UserButtonTypes> = ({handleUserLogout}) => {
    const {user} = useUserContext();

    const items: MenuProps['items'] = [
        {
          label: 'Logout',
          key: '0',
          onClick: handleUserLogout,
        },
    ]

    return (
        <Dropdown menu={{ items }} trigger={['click']} className='user-options-dropdown'>
            <button className='user-button'>
                {user && user.name}
                <img src={arrowImg} alt='user options' className='user-button__img' />
            </button>
        </Dropdown>
    )
}