import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header';
import { MainContainer } from './components/mainContainer/mainContainer';
import { CurrentCategoryProvider } from './context/categoryContext';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/userContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.scss';
import { ThemeProvider } from './context/ThemeContext';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
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
                </UserProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;



