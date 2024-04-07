import { createBrowserRouter, redirect } from "react-router-dom";
import SessionService from "./infrastructure/Services/SessionService";
import Login from "./interfaces/web/Auth/Login";
import Admin from "./interfaces/web/Admin";
import Register from "./interfaces/web/Auth/Register";
import menu from "./utils/menu";
import Landing from "./interfaces/web/Landing";
import ForgotPassword from "./interfaces/web/Auth/ForgotPassword";
import ConfirmPassword from "./interfaces/web/Auth/ConfirmPassword";
import ActivateAccount from "./interfaces/web/Auth/ActivateAccount";
import Home from "./interfaces/web/Landing/Home";
import Normative from "./interfaces/web/Landing/Normative";
import FAQ from "./interfaces/web/Landing/FAQ";
import PublicEstablishment from "./interfaces/web/Landing/Establishment/List/PublicEstablshment";
import PublicEstablishmentDetail from "./interfaces/web/Landing/Establishment/Detail/PublicEstablishmentDetail";
import PublicationDetail from "./interfaces/web/Landing/Publication/Detail";
import Entry from "./interfaces/web/Auth/Entry";
import { IS_SERVER } from "./utils/constans";

const handleLoadeAuth = () => {
  const isLogged = SessionService.isLogged();
  if (!isLogged) {
    return redirect("/");
  }
  return null;
};

const handleLoade = () => {
  const isLogged = SessionService.isLogged();
  if (isLogged) {
    return redirect("/admin");
  }
  return null;
};

const handleLoadeAdmin = (permissions: string) => {
  const user = SessionService.getUserData();
  if (
    !user.user_permissions?.map((item) => item.codename).includes(permissions)
  ) {
    return redirect("/");
  }
  return null;
};

const handleLoaderLocked = () => {
  const isLocked = SessionService.isLocked();
  if (!isLocked) {
    return redirect("/locked");
  }
  return null;
};

const Router = createBrowserRouter(
  [

    IS_SERVER != 'N' ? {
      path: "/locked",
      element: <Entry />,
    } : {},
    {
      path: "/",
      element: <Landing />,
      loader: () => IS_SERVER != 'N' ? handleLoaderLocked() : null,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/normativa",
          element: <Normative />,
        },
        {
          path: "/area-pedagogica",
          element: <FAQ />,
        },
        {
          path: "/entidades",
          element: <PublicEstablishment />,
        },
        {
          path: "/entidades/:slug",
          element: <PublicEstablishmentDetail />,
        },
        {
          path: "/publicaciones/:slug",
          element: <PublicationDetail />,
        },


      ],
    },
    {
      path: "/ingreso",
      element: <Login />,
      loader: () => handleLoade(),
    },
    {
      path: "/registro",
      element: <Register />,
      loader: () => handleLoade(),
    },
    {
      path: "/auth/forgot-password",
      element: <ForgotPassword />,
      loader: () => handleLoade(),
    },
    {
      path: "/auth/reset-password/:token",
      element: <ConfirmPassword />,
      loader: () => handleLoade(),
    },
    {
      path: "/auth/activate-account/:uid/:token",
      element: <ActivateAccount />,
      loader: () => handleLoade(),
    },
    {
      path: "/admin",
      element: <Admin />,
      loader: () => handleLoadeAuth(),

      children: menu.map((item) => {
        return {
          path: item.path,
          element: item.element,
          loader: () => handleLoadeAdmin(item.permission_required),
        };
      }),
    },
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default Router;
