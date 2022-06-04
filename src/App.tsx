/* eslint-disable */
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import {
  Home, Asset, AssetDetails, MainLayout, NotFound,
} from './Pages';

const App: React.FC = (): JSX.Element => {
  const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Home /> },
      { path: '404', element: <NotFound /> },
      { path: ':asset', element: <Home /> }, // <Asset />
      { path: ':asset/details', element: <Home /> }, //  <AssetDetails /> 
    ],
  };

  const routing = useRoutes([mainRoutes]);

  return <>{routing}</>;
};

export default App;
