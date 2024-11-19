import './RadiusButton.scss'

interface RadiusButtonTypes {
    active: boolean;
    onChange: (newState: boolean)=> void;
}

export const RadiusButton: React.FC<RadiusButtonTypes> = ({active, onChange}) => {

    const handleClick = () => {
        onChange(!active);  
    };

    return (
        <div
            className={`radius-button ${active ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className='point' />
        </div>
    )
}