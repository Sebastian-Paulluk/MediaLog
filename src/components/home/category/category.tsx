import { Link } from 'react-router-dom';
import './category.scss';
import { CategoryTypes } from '../../../types/types';
import { normalizeText } from '../../../functions/normalizeText';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useCurrentCategoryContext } from '../../../context/categoryContext';
import { Dots } from './Dots/Dots';


type CategoryProps = {
	category: CategoryTypes;
	deleteCategory: (categoryId: string) => void;
};


export const Category = ({ category, deleteCategory }: CategoryProps) => {
	const normalizedCategoryName = normalizeText(category.name)
	const { setCurrentCategory } = useCurrentCategoryContext();

	const handleSelectCategory =()=>{
		setCurrentCategory(category)
	}

	const handleDeleteCategory = async()=>{
		if (category.id) {
			deleteCategory(category.id)
		}
	}

	const items: MenuProps['items'] = [
		{
		  label: 'Delete',
		  key: '0',
		  onClick: handleDeleteCategory,
		},
	]


	return (
		<div className='category-container'>
			<Link to={`/category/${category.id}`} onClick={handleSelectCategory}>
				<div className='category'>
						<div className='top-side'></div>
						<div className='bottom-side'>
							<p className="category-title">{normalizedCategoryName}</p>
						</div>
				</div>
			</Link>

			<Dropdown 
				menu={{ items }}
				trigger={['click']}
				className='dropdown-categpry-options-menu'
				 placement="bottomRight"
			>
				<button className='category-options-button'>
					<Dots />
				</button>
			</Dropdown>
		</div>

	);
};
