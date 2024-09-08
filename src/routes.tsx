
import { createBrowserRouter, redirect } from 'react-router-dom'
import SessionService from './infrastructure/Services/SessionService'
import Admin from './interfaces/web/Admin'
import { InvalidSession } from './interfaces/web/Auth/401'
import ActivateAccount from './interfaces/web/Auth/ActivateAccount'
import ConfirmPassword from './interfaces/web/Auth/ConfirmPassword'
import Entry from './interfaces/web/Auth/Entry'
import ForgotPassword from './interfaces/web/Auth/ForgotPassword'
import Login from './interfaces/web/Auth/Login'
import Register from './interfaces/web/Auth/Register'
import IndicatorsAdmin from './interfaces/web/Dashboard/IndicatorsAdmin'
import Landing from './interfaces/web/Landing'
import About from './interfaces/web/Landing/About'
import PublicEstablishmentDetail from './interfaces/web/Landing/Establishment/Detail/PublicEstablishmentDetail'
import PublicEstablishment from './interfaces/web/Landing/Establishment/List/PublicEstablshment'
import FAQ from './interfaces/web/Landing/FAQ'
import Home from './interfaces/web/Landing/Home'
import Normative from './interfaces/web/Landing/Normative'
import PublicationDetail from './interfaces/web/Landing/Publication/Detail'
import Audience from './interfaces/web/Landing/Thematics/Audience'
import Personal from './interfaces/web/Landing/Thematics/Personal'
import Finance from './interfaces/web/Landing/Thematics/Presupuesto'
import Solicity from './interfaces/web/Landing/Thematics/Solicity'
import Tutorials from './interfaces/web/Landing/Tutorials'
import { BASE_URL, IS_SERVER } from './utils/constans'
import menu from './utils/menu'
import Politics from "./interfaces/web/Landing/Politics";
import { NotFount404 } from './interfaces/web/Dashboard/404'


const handleLoadeAuth = () => {
  const isLogged = SessionService.isLogged()
  if (!isLogged) {
    return redirect('/')
  }
  return null
}

const handleLoade = () => {
  const isLogged = SessionService.isLogged()
  if (isLogged) {
    return redirect('/admin')
  }
  return null
}

const handleLoadeAdmin = (permissions: string) => {
  const permissionSplit = permissions.split(',')
  const user = SessionService.getUserData()
  console.log(permissionSplit)
  const busqueda = user.user_permissions?.some(item => permissionSplit.includes(item.codename))
  if (permissions == '') {
    return null
  }
  if (!busqueda) {
    return redirect('/')
  }
  return null
}

const handleLoaderLocked = () => {
  const isLocked = SessionService.isLocked()
  if (!isLocked) {
    return redirect('/locked')
  }
  return null
}

const Router = createBrowserRouter(
  [
    IS_SERVER != 'N'
      ? {
          path: '/locked',
          element: <Entry />
        }
      : {},
    {
      path: '/',
      element: <Landing />,
      loader: () => (IS_SERVER != 'N' ? handleLoaderLocked() : null),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/401',
          element: <InvalidSession />
        },
        {
          path: '/normativa',
          element: <Normative />
        },
        {
          path: '/acerca-de',
          element: <About />
        },
        {
          path: '/area-pedagogica',
          element: <FAQ />
        },
        {
          path: '/tutoriales',
          element: <Tutorials />
        },
        {
          path: '/entidades',
          element: <PublicEstablishment />
        },
        {
          path: '/entidades/:slug',
          element: <PublicEstablishmentDetail />
        },
        {
          path: '/indicadores',
          element: <IndicatorsAdmin />
        },
        {
          path: '/publicaciones/:slug',
          element: <PublicationDetail />
        },

        {
          path: '/presupuesto',
          element: <Finance />
        },

        {
          path: '/personal-remuneracion',
          element: <Personal />
        },
        {
          path: '/audiencias-reuniones',
          element: <Audience />
        },
        {
          path: '/formularios-solicitudes',
          element: <Solicity />
        },

        {
          path: "/politicas-condiciones",
          element: <Politics />
        },

        {
          path: '/ingreso',
          element: <Login />,
          loader: () => handleLoade()
        },
        {
          path: '/registro',
          element: <Register />,
          loader: () => handleLoade()
        },
        {
          path: '/auth/forgot-password',
          element: <ForgotPassword />,
          loader: () => handleLoade()
        },
        {
          path: '/auth/reset-password/:token',
          element: <ConfirmPassword />,
          loader: () => handleLoade()
        },
        {
          path: '/auth/activate-account/:uid/:token',
          element: <ActivateAccount />,
          loader: () => handleLoade()
        }
      ]
    },

    {
      path: '/admin',
      element: <Admin />,
      loader: () => handleLoadeAuth(),
      children: menu.map(item => {
        return {
          path: item.path,
          element: item.element,
          loader: () => handleLoadeAdmin(item.permission_required)
        }
      })
    },
    {
      path: '*',
      element: <NotFount404 />
    }
  ],
  {
    basename: BASE_URL
  }
)

export default Router
