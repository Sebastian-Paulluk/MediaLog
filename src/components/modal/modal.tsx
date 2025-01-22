import { ReactNode, useEffect, useState } from 'react';
import './modal.scss';

interface ModalTypes {
	open: boolean;
	children: ReactNode;
	handleScrollBar?: boolean;
	onClose: () => void;
}

export const Modal: React.FC<ModalTypes> = ({
	open,
	children,
	handleScrollBar = true,
}) => {
	const [visibility, setVisibility] = useState(open);

	const lockScroll = () => {
		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	};

	const unlockScroll = () => {
		document.body.style.overflow = 'auto';
		document.body.style.paddingRight = '0px';
	};

	useEffect(() => {
		setVisibility(open);
		if (handleScrollBar) {
			if (open) {
				lockScroll();
			} else {
				unlockScroll();
			}
		}

		return () => {
			if (handleScrollBar) {
				unlockScroll();
			}
		};
	}, [open, handleScrollBar]);

	return (
		<div className={`modal ${visibility ? '' : 'hidden'}`}>
			<div className="modal-background" />
			<div className="modal-content">{children}</div>
		</div>
	);
};
