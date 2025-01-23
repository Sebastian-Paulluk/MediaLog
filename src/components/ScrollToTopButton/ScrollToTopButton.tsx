import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.scss';
import arrowUp from '../../assets/images/arrow-up.png';

export const ScrollToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const scrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div>
			{isVisible && (
				<button onClick={scrollToTop} className="scroll-to-top-button">
					<img
						src={arrowUp}
						className="scroll-to-top-button__img"
						alt="arrow-up-img"
					/>
				</button>
			)}
		</div>
	);
};
