import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/header/header';
import { MainContainer } from './components/mainContainer/mainContainer';
import { CurrentCategoryProvider } from './context/categoryContext';
import { DataProvider } from './context/DataContext';
import { UserProvider } from './context/userContext';
import { AppRoutes } from './routes/AppRoutes';
import './App.scss';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <UserProvider>
                    <DataProvider>
                        <Header />
                        <CurrentCategoryProvider>
                            <MainContainer>
                                <AppRoutes />
                            </MainContainer>
                        </CurrentCategoryProvider>
                    </DataProvider>
                </UserProvider>
            </BrowserRouter>
        </div>
    );
}
export default App;



