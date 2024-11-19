import { ReactNode } from 'react';
import './mainContainer.scss';
import { ToolsBar } from '../ToolsBar/ToolsBar';
import { useDataContext } from '../../context/DataContext';

interface MainContainerProps {
	children: ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
	const {user} = useDataContext();

	return (
		<div className="main-container">
			{
				user ? (
					<>
						<ToolsBar />
						{children}
					</>
				) : (
					<>
						{children}
					</>
				)
			}

		</div>
	);
};
