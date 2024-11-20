import { useEffect, useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/firebase';
import { useDataContext } from '../../context/DataContext';
import { LoadingScreen } from '../loadingScreen/loadingScreen';
import { Spin } from '../Spin/Spin';
import { errorMessages } from "../../utils/personalizedAuthMessages"; 

interface LoginTypes {
    
}

export const Login: React.FC<LoginTypes> = () => {
    const [email, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const  {user, userSessionVerified} = useDataContext();
    const [logingIn , setLogingIn] = useState(false);

    useEffect(() => {
        if (userSessionVerified && user) {
            navigate("/");
        }
    }, [user, userSessionVerified]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLogingIn(true);
            await loginUser( email, password );
            localStorage.setItem("isAuthenticated", "true");
        } catch (error) {
            setLogingIn(false);
            if (error instanceof Error) {
                const errorCode = (error as any).code || "unknown";
                const errorMessage = errorMessages[errorCode] || "An unknown error occurred.";
                setError(errorMessage);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    const handleSignInClick =()=> {
        navigate('/sign-up');
    }

    return (
        <>
            {
                userSessionVerified ? (

                    <div className='log-in'>
                        <form onSubmit={handleSubmit} className='log-in-form'>
            
                            <div className='log-in-form__input-container'>
                                <label htmlFor="username">Email</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={email}
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                />
                                
                            </div>
            
                            <div className='log-in-form__input-container'>
                            <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                
                            </div>

                            <button type="submit" className='log-in-button'>Log in</button>

                            <div className='log-in-status'>
                                {
                                    logingIn ? (
                                        <Spin size='small'/>
                                    ) : (
                                        error ? (
                                            <p>{error}</p>
                                        ) : (
                                            null
                                        )
                                    )
                                }
                            </div>

                        </form>

                        <div className='log-in__sign-up-option'>
                            <p>Don't have an account?</p>
                            <button onClick={handleSignInClick} className='log-in__sign-up-option__link'>Sign up</button>
                        </div>
                    </div>

                ) : (
                    <LoadingScreen />
                )
            }
        </>

    )
}