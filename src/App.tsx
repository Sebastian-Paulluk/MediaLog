import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { MainContainer } from './components/mainContainer/mainContainer';
import { CategoriesContainer } from './components/categoryContainer/CategoriesContainer';
import { CurrentCategoryProvider } from './context/categoryContext';
import { SearchScreen } from './components/SearchScreen/SearchScreen';
import { DataProvider, useDataContext } from './context/DataContext';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';

function AppRoutes() {
    const { user } = useDataContext();

    return (
        <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/category/:categoryId" element={user ? <CategoriesContainer /> : <Navigate to="/login" />} />
            <Route path="/search/:query/" element={user ? <SearchScreen /> : <Navigate to="/login" />} />
            <Route path="/search/category/:categoryId/:query" element={user ? <SearchScreen /> : <Navigate to="/login" />} />
        </Routes>
    );
}

function App() {

	return (
		<div className="App">
			<BrowserRouter>
				<DataProvider>
					<Header />
					<CurrentCategoryProvider>
							<MainContainer>
								<AppRoutes />
							</MainContainer>
					</CurrentCategoryProvider>
				</DataProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;



