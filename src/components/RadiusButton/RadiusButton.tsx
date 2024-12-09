import './RadiusButton.scss'

interface RadiusButtonTypes {
    active: boolean;
    onChange: ()=> void;
}

export const RadiusButton: React.FC<RadiusButtonTypes> = ({active, onChange}) => {

    const handleClick = () => {
        onChange();
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