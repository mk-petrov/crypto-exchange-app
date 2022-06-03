import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/Search';
import classes from './Home.module.css';

const Home:React.FC = () => {
  const [currency, setCurrency] = useState('');
  const onSearchChange = (e: any) => {
    setCurrency(e.target.value);
  };

  const onSearchClick = () => {
    console.log('clicked!');
  };
  // TODO api call get available assets, populate form, autocomplete
  return (
    <div className={classes.wrapper}>
      {/* App title component */}
      <div className={classes.title}>Crypto Exchange App</div>

      {/* <button>Search</button> */}
      {/* TODO: search component */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          fullWidth
          focused
          id="outlined-name"
          label="Cryptocurrency"
          value={currency}
          onChange={onSearchChange}
          type="search"
          variant="standard"
        />
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={onSearchClick}>
          <PhotoCamera />
        </IconButton>
      </Stack>
    </div>
  );
};

export default Home;
