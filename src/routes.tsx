import {
    createBrowserRouter, redirect
} from 'react-router-dom';
import SessionService from './infrastructure/Services/SessionService';
import Login from './interfaces/web/Auth/Login';
import Admin from './interfaces/web/Admin';
import Register from './interfaces/web/Auth/Register';
import menu from './utils/menu';
import Landing from './interfaces/web/Landing';
import ForgotPassword from './interfaces/web/Auth/ForgotPassword';
import ConfirmPassword from './interfaces/web/Auth/ConfirmPassword';
import ActivateAccount from './interfaces/web/Auth/ActivateAccount';



const handleLoadeAuth = ()=>{
    const isLogged = SessionService.isLogged();
    if(!isLogged){
        return redirect('/');
    }
    return null;
}

const handleLoade = ()=>{
    const isLogged = SessionService.isLogged();
    if(isLogged){
        return redirect('/admin');
    }
    return null;
}

const handleLoadeAdmin = (permissions: string)=>{

    const user= SessionService.getUserData();
    if (!user.user_permissions?.map((item)=>item.codename).includes(permissions)){
        return redirect('/');
    }
    return null;

}   


const Router = createBrowserRouter(
    
    
    [

        {
            path: '/',
            element: <Landing />
            
        },
        {
            path: '/auth/login',
            element: <Login />, 
            loader:()=>handleLoade(),
        },
        {
            path: '/auth/register',
            element: <Register />,
            loader:()=>handleLoade(),

        },
        {
            path: '/auth/forgot-password',
            element:<ForgotPassword />,
            loader:()=>handleLoade(),

        },
        {
            path: '/auth/reset-password/:token',
            element: <ConfirmPassword/>,
            loader:()=>handleLoade(),

        },
        {
            path: '/auth/activate-account/:uid/:token',
            element: <ActivateAccount />,
            loader:()=>handleLoade(),
        },
        {
            path: '/admin', 
            element: <Admin />,
            loader:()=>handleLoadeAuth(),

            children: menu.map((item)=>{
                    return {
                        path: item.path,
                        element: item.element,
                        loader: ()=>handleLoadeAdmin(item.permission_required),
                    }
                })
            

        }
    ]
);

export default Router;