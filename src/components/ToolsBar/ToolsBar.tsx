import { Path } from './path/path';
import { SearchInput } from './SearchInput/SearchInput';
import './ToolsBar.scss';

export const ToolsBar: React.FC = () => {
	return (
		<div className="tools-bar-container">
			<div className="tools-bar">
				<Path />
				<SearchInput />
			</div>
		</div>
	);
};
