import { useCallback, useEffect, useState } from 'react';
import { CategoryTypes } from '../../../types/types';
import './EditCategoryForm.scss';
import closeImg from '../../../assets/images/close.png';

interface EditCategoryFormTypes {
	category: CategoryTypes;
	onClose: () => void;
	onSubmit: (updateCategory: Partial<CategoryTypes>) => void;
}

export const EditCategoryForm: React.FC<EditCategoryFormTypes> = ({
	category,
	onClose,
	onSubmit,
}) => {
	const [categoryData, setCategoryData] = useState({
		name: category.name,
	});

	const updateData = useCallback(() => {
		setCategoryData({
			name: category.name,
		});
	}, [category.name]);

	useEffect(() => {
		updateData();
	}, [category, updateData]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategoryData({
			...categoryData,
			name: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(categoryData);
		onClose();
	};

	const handleCancel = (e: React.FormEvent) => {
		e.preventDefault();
		setTimeout(() => {
			updateData();
		}, 300);
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} className="update-other-item-form form">
			<div className="form__title form__updating-title">
				Updating:
				<div className="item-name">{category.name}</div>
			</div>

			<div className="form-body">
				<label htmlFor="name" className="form__label">
					Name
				</label>
				<input
					className="form__input"
					type="text"
					name="name"
					required
					value={categoryData.name}
					onChange={handleNameChange}
				/>
			</div>

			<button
				type="button"
				className="form__close-button"
				onClick={handleCancel}
			>
				<img
					className="form__close-button__img"
					src={closeImg}
					alt="close"
				/>
			</button>

			<div className="form__buttons-container ">
				<button type="submit" className="form__submit-button">
					{' '}
					Save changes{' '}
				</button>
				<button
					type="button"
					className="form__cancel-button"
					onClick={handleCancel}
				>
					{' '}
					Cancel{' '}
				</button>
			</div>
		</form>
	);
};
