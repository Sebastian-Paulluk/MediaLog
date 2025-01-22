import { useEffect, useState } from 'react';
import './addCategoryModal.scss';
import { AddCategoryForm } from '../../Forms/addCategoryForm/addCategoryForm';
import { CategoryTypes } from '../../../types/types';

interface ModalTypes {
	open: boolean;
	handleScrollBar?: boolean;
	onClose: () => void;
	onSubmit: (newCategory: CategoryTypes) => void;
}

export const AddCategoryModal: React.FC<ModalTypes> = ({
	onClose,
	open,
	onSubmit,
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
		<div className={`add-category-modal ${visibility ? '' : 'hidden'}`}>
			<div className="modal-background" onClick={onClose}></div>
			<div className="modal-content">
				<AddCategoryForm onSubmit={onSubmit} onClose={onClose} />
			</div>
		</div>
	);
};
