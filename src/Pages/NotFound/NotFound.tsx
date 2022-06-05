import React from 'react';

import classes from './NotFound.module.css';

const NotFound: React.FC = (): JSX.Element => (
  <>
    <div className={classes.title}>Page not found :(</div>
  </>
);

export default NotFound;
