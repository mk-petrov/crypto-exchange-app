/* eslint-disable */
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import {
  Home, MainLayout, NotFound,
} from './Pages';


const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Home /> },
      { path: '404', element: <NotFound /> },
      { path: ':asset', element: <Home /> },
      { path: ':asset/details', element: <Home /> },
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};

export default App;
