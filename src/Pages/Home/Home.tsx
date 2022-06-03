import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/Search';
import classes from './Home.module.css';
import { UITable } from '../../components';

const Home:React.FC = () => {
  const [currency, setCurrency] = useState('');
  const onSearchChange = (e: any) => {
    setCurrency(e.target.value);
  };

  const onSearchClick = () => {
    console.log('clicked!');
  };
  // TODO api call get available assets, populate form, autocomplete
  // TODO: merge into master

  // TODO: redux
  // TODO: available pairs
  // TODO: table view
  // TODO: details view
  // TODO: sockets

  const info = {
    binance: { price: 40000.20 },
    bitfinex: { price: 41000.20 },
    Huobi: { price: 40003.20 },
    Kraken: { price: 40050.20 },
  };

  console.log({ info });

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

      <div style={{ marginTop: 40 }} />
      <UITable />

    </div>
  );
};

export default Home;
