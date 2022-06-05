import React from 'react';
import { Outlet } from 'react-router-dom';

import classes from './Asset.module.css';

const Asset: React.FC = (): JSX.Element => (
  <>
    <div className={classes.title}>Asset Page</div>
    <Outlet />
  </>
);

export default Asset;
