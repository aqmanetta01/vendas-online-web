import { RouteObject } from 'react-router-dom';

import FirstScreen from './screens/firstScreen';

export const firstScreenRoutes: RouteObject[] = [
  {
    path: '/',
    element: <FirstScreen />,
    errorElement: <div>PÁGINA NÂO ENCONTRADA</div>,
  },
];
