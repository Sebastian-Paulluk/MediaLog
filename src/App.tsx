import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header';
import { MainContainer } from './components/mainContainer/mainContainer';
import { CurrentCategoryProvider } from './context/categoryContext';
import { DataProvider } from './context/DataContext';
import { useUserContext } from './context/userContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext';
import { SplashScreen } from './components/SplashScreen/SplashScreen';

function App() {
    const { user, isUserLoggedIn, userSessionVerified } = useUserContext();

    if (!userSessionVerified) {
        return <SplashScreen />;
    }

    if (userSessionVerified && isUserLoggedIn && !user) {
        return <SplashScreen />;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <DataProvider>
                    <ThemeProvider>
                        <Header />
                        <CurrentCategoryProvider>
                            <MainContainer>
                                <AppRoutes />
                            </MainContainer>
                        </CurrentCategoryProvider>
                    </ThemeProvider>
                </DataProvider>
            </BrowserRouter>
        </div>
    );
}


export default App;
