import './main.css';

import type { Router as RemixRouter } from '@remix-run/router';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modulos/firstScreen/routes';
import { loginRoutes } from './modulos/login/routes';
import { productScreens } from './modulos/product/routes';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enums';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequests';

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [...productScreens, ...firstScreenRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request } = useRequests();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser);
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
