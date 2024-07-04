import './main.css';

import type { Router as RemixRouter } from '@remix-run/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { firstScreenRoutes } from './modulos/firstScreen/routes';
import { loginRoutes } from './modulos/login/routes';
import { productScreens } from './modulos/product/routes';
import { useNotification } from './shared/hooks/useNotification';

const router: RemixRouter = createBrowserRouter([
  ...productScreens,
  ...firstScreenRoutes,
  ...loginRoutes,
]);

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
