import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../components/home/home';
import { CategoriesContainer } from '../components/categoryContainer/CategoriesContainer';
import { SearchScreen } from '../components/SearchScreen/SearchScreen';
import { Login } from '../components/Login/Login';
import { SignUp } from '../components/SignUp/SignUp';
import { useUserContext } from '../context/userContext';

export const AppRoutes = () => {
	const { user } = useUserContext();

	return (
		<Routes>
			<Route
				path="/"
				element={user ? <Home /> : <Navigate to="/login" />}
			/>
			<Route path="/login" element={<Login />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route
				path="/category/:categoryId"
				element={
					user ? <CategoriesContainer /> : <Navigate to="/login" />
				}
			/>
			<Route
				path="/search/:query/"
				element={user ? <SearchScreen /> : <Navigate to="/login" />}
			/>
			<Route
				path="/search/category/:categoryId/:query"
				element={user ? <SearchScreen /> : <Navigate to="/login" />}
			/>
			<Route
				path="/category/:categoryId/folder/:folderId"
				element={
					user ? <CategoriesContainer /> : <Navigate to="/login" />
				}
			/>
		</Routes>
	);
};
