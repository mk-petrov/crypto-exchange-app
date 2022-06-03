import React, { useState } from 'react';

import classes from './Home.module.css';
import { UITable, UISearch } from '../../components';
import { IAsset } from '../../interfaces/Asset'

function createData( price: string, exchange: string ): IAsset {
  return { price, exchange };
}

const rows = [
  createData('1 BTC = 3001.23 {curr}', 'Binance1'),
  createData('The pair is not supported', 'Binance2'),
  createData('1 BTC = 3002.23 {curr}', 'Binance3'),
  createData('1 BTC = 3003.23 {curr}', 'Binance4'),
];

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

  // TODO: %2F

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
      <UISearch onClick={onSearchClick} onChange={onSearchChange} value={currency} />

      <div style={{ marginTop: 40 }} />
      <UITable rows={rows} />

    </div>
  );
};

export default Home;
