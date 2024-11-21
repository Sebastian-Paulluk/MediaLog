import './Spin.scss'

interface SpinTypes {
    size?: string;
    paddingTop?: string;
}

export const Spin: React.FC<SpinTypes> = ({size='small', paddingTop='default'}) => {
    // size: default (no param), medium, large
    // paddingTop: default (no param), normal, far

    return (
        <div className={`spin ${size} ${paddingTop}`}/>
    );
}