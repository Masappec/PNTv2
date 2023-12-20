import  {
    createBrowserRouter
} from 'react-router-dom';
import LoginContainer from './components/Auth/Login/LoginContainer';
import LoginUseCase from './domain/useCases/Authentication/LoginUseCase';
import AuthService from './infrastructure/Services/AuthService';
import AuthApi from './infrastructure/Api/Auth/AuthApi';
import api from './infrastructure/Api';


const _api = api;
const authApi = new AuthApi(_api);
const authService = new AuthService(authApi);
const loginUseCase = new LoginUseCase(authService);

const Router = createBrowserRouter(
    [
        { path: '/', element: <LoginContainer useCase={loginUseCase} /> ,handle: () => {}},
    ]
);

export default Router;