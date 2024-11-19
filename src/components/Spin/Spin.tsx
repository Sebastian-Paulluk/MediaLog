import './Spin.scss'

interface SpinTypes {
    size?: string;
}

export const Spin: React.FC<SpinTypes> = ({size='small'}) => {

    return (
        <div className={`spin ${size}`}/>
    );
}