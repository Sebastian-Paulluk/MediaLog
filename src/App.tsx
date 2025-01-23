import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header';
import { MainContainer } from './components/mainContainer/mainContainer';
import { CurrentCategoryProvider } from './context/categoryContext';
import { useDataContext } from './context/DataContext';
import { useUserContext } from './context/userContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import { ScrollToTopButton } from './components/ScrollToTopButton/ScrollToTopButton';

function App() {
	const { user, isUserLoggedIn, userSessionVerified } = useUserContext();
	const { dataLoaded } = useDataContext();

	if (
		!userSessionVerified ||
		(isUserLoggedIn && !user) ||
		(isUserLoggedIn && user && !dataLoaded)
	) {
		return <SplashScreen />;
	}

	return (
		<div className="App">
			<BrowserRouter>
				<ThemeProvider>
					<Header />
					<CurrentCategoryProvider>
						<MainContainer>
							<AppRoutes />
						</MainContainer>
					</CurrentCategoryProvider>
				</ThemeProvider>
			</BrowserRouter>
			<ScrollToTopButton />
		</div>
	);
}

export default App;
