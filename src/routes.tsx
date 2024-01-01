import {
    createBrowserRouter, redirect
} from 'react-router-dom';
import SessionService from './infrastructure/Services/SessionService';
import Login from './interfaces/web/Auth/Login';
import Admin from './interfaces/web/Admin';
import Register from './interfaces/web/Auth/Register';
import menu from './utils/menu';
import Landing from './interfaces/web/Landing';




const Router = createBrowserRouter(
    
    
    [

        {
            path: '/',
            element: <Landing />
            
        },
        {
            path: '/login',
            element: <Login />, 
            loader: ()=>{
                const isLogged = SessionService.isLogged();
                if(isLogged){
                    return redirect('/admin');
                }
                return null;
            }
        },
        {
            path: '/register',
            element: <Register />,
            loader: ()=>{
                const isLogged = SessionService.isLogged();
                if(isLogged){
                    return redirect('/admin');
                }
                return null;
            }
        },
        {
            path: '/admin', 
            element: <Admin />,
            loader: ()=>{
                const isLogged = SessionService.isLogged();
                if(!isLogged){
                    return redirect('/');
                }
                return null;
            },
            children: menu.map((item)=>{
                    return {
                        path: item.path,
                        element: item.element
                    }
                })
            

        }
    ]
);

export default Router;