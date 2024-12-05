import { Link } from 'react-router-dom';
import './category.scss';
import { CategoryTypes } from '../../../../types/types';
import normalizeText from '../../../../utils/normalizeText';
import { useCurrentCategoryContext } from '../../../../context/categoryContext';
import { Dots } from '../Dots/Dots';
import React from 'react';
import { AlertDialog } from '../../../AlertDialog/AlertDialog';
import { PopMenu } from '../../../PopMenu/PopMenu';


type CategoryProps = {
	category: CategoryTypes;
	deleteCategory: (categoryId: string) => void;
};


export const Category = ({ category, deleteCategory }: CategoryProps) => {
	const normalizedCategoryName = normalizeText.firstLettersCaps(category.name)
	const { setCurrentCategory } = useCurrentCategoryContext();
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleSelectCategory =()=>{
		setCurrentCategory(category)
	}

	const handleDeleteCategory = async()=>{
		if (category.id) {
			deleteCategory(category.id)
		}
	}

	const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

	const popMenuProps = {
		options: [
			{name: 'Edit', icon: 'edit', onClick: ()=>{console.log('me edito')}},
			{name: 'Delete', icon: 'delete', onClick: handleClickOpenDialog},
		]
	}

	return (

		<div className='category-container'>
			<Link to={`/category/${category.id}`} onClick={handleSelectCategory}>
				<div className='category'>
						<div className='top-side'>
							
						</div>
						<div className='bottom-side'>
							<p className="category-title">{normalizedCategoryName}</p>
						</div>
				</div>
			</Link>

			<PopMenu {...popMenuProps}>
				<button className='category-options-button'>
					<Dots />
				</button>
			</PopMenu>

			<AlertDialog
				open={openDialog}
				setOpen={setOpenDialog}
				handleDeleteCategory={handleDeleteCategory}
			/>
		</div>

	);
};
