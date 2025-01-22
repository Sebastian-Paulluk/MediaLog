import { useState } from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/firebase';
import { Spin } from '../Spin/Spin';
import { errorMessages } from '../../utils/personalizedAuthMessages';
import { FirebaseError } from 'firebase/app';

export const SignUp: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const [signingUp, setSigningUp] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setSigningUp(true);
			await registerUser(name, email, password);
			localStorage.setItem('isAuthenticated', 'true');
			navigate('/');
		} catch (error) {
			setSigningUp(false);
			if (error instanceof Error) {
				const firebaseError = error as FirebaseError;
				const errorCode = firebaseError.code || 'unknown';
				const errorMessage =
					errorMessages[errorCode] || 'An unknown error occurred.';
				setError(errorMessage);
			} else {
				setError('An unknown error occurred.');
			}
		}
	};

	const handleLogInClick = () => {
		navigate('/login');
	};

	return (
		<div className="sign-up">
			<form onSubmit={handleSubmit} className="sign-up__form">
				<div className="sign-up__form__input-container">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				<div className="sign-up__form__input-container">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setMail(e.target.value)}
						required
					/>
				</div>

				<div className="sign-up__form__input-container">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>

				<button type="submit" className="sign-up-button">
					Sign up
				</button>

				<div className="sign-up__form__status">
					{signingUp ? (
						<Spin size="small" />
					) : error ? (
						<p>{error}</p>
					) : null}
				</div>
			</form>
			<div className="sign-up__log-in-option">
				<p>Already have an account?</p>
				<button
					onClick={handleLogInClick}
					className="sign-up__log-in-option__link"
				>
					Log in
				</button>
			</div>
		</div>
	);
};
