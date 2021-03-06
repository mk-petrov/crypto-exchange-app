import React from 'react';
import { Outlet } from 'react-router-dom';

import classes from './MainLayout.module.css';

const MainLayout: React.FC = (): JSX.Element => (
  <>
    <div
      className={classes.overlay}
      style={{
        backgroundImage: `url(${`${process.env.PUBLIC_URL}/assets/images/crypto2.jpeg`})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    />
    <div
      className={[classes.overlay, classes.blur].join(' ')}
      style={{
        backgroundColor: '#000',
        opacity: 0.9,
      }}
    />
    <Outlet />
  </>
);

export default MainLayout;
