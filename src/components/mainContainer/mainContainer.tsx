import { ReactNode } from 'react';
import './mainContainer.scss';
import { ToolsBar } from '../ToolsBar/ToolsBar';
import { useUserContext } from '../../context/userContext';

interface MainContainerProps {
	children: ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
	const { user } = useUserContext();

	return (
		<div className="main-container">
			{user ? (
				<>
					<ToolsBar />
					{children}
				</>
			) : (
				<>{children}</>
			)}
		</div>
	);
};
