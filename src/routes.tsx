import {
    createBrowserRouter, redirect
} from 'react-router-dom';
import LoginContainer from './components/Auth/Login/LoginContainer';
import LoginUseCase from './domain/useCases/Authentication/LoginUseCase';
import AuthService from './infrastructure/Services/AuthService';
import AuthApi from './infrastructure/Api/Auth/AuthApi';
import api from './infrastructure/Api';
import LayoutAdmin from './components/Common/Layout/Admin';
import SessionService from './infrastructure/Services/SessionService';


const _api = api;
const authApi = new AuthApi(_api);
const authService = new AuthService(authApi);
const loginUseCase = new LoginUseCase(authService);

const Router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LoginContainer useCase={loginUseCase} />, 
            loader: ()=>{
                const isLogged = SessionService.isLogged();
                if(isLogged){
                    return redirect('/admin');
                }
                return null;
            }
        },
        {
            path: '/admin', element: <LayoutAdmin />,
            loader: ()=>{
                const isLogged = SessionService.isLogged();
                if(!isLogged){
                    return redirect('/');
                }
                return null;
            },
            children: [

            ]

        }
    ]
);

export default Router;