import { v4 as uuidv4 } from 'uuid';
import { formatPrice } from './helpers';
import { PAIR_NOT_SUPPORTED } from '../config/constants';

export const binanceApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = 'The pair is not supported'
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      const formatPair = pair.toLocaleUpperCase().replace('/', 'B')
      // const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${formatPair}`);
      const response = await fetch(`/v3/ticker/price?symbol=${formatPair}`);
      const result = await response.json();


      if (result?.price) {
        price = `1 ${firstCurrency.toLocaleUpperCase()} = ${formatPrice(result.price, 2)} ${secondCurrency.toLocaleUpperCase()}`;
      }
      
    } catch (error) {}

    return {
      id: uuidv4(),
      exchange: 'BINANCE',
      price,
    };
  },
  // getDetails: async (pair: string):Promise => {
  //   try {
  //     const response = await fetch(`https://api.binance.com'/api/v3/trades?symbol=${pair}&limit=10`);
  //     const result = await response.json();

  //     return {
  //       id: uuidv4(),
  //       exchange: 'Binance',
  //       price: result?.price
  //     };
  //   } catch (error) {
  //     console.error(error)
  //     return null
  //   }
  // }
}

export const bitfinexApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = 'The pair is not supported'
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      const formatPair = pair.toLocaleUpperCase().replace('/', '')
      // const response = await fetch(`https://api-pub.bitfinex.com/v2/ticker/t${formatPair}`);
      const response = await fetch(`/v2/ticker/t${formatPair}`);
      const result = await response.json();
      if (result && result.length > 6) {

        price = `1 ${firstCurrency.toLocaleUpperCase()} = ${formatPrice(result[6], 2)} ${secondCurrency.toLocaleUpperCase()}`;
      }
      
    } catch (error) {}

    return {
      id: uuidv4(),
      exchange: 'BITFINEX',
      price,
    };
  },
}

export const krakenApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = PAIR_NOT_SUPPORTED
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      const formatPair = pair.toLocaleUpperCase().replace('/', '')
      // const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${formatPair}`);
      const response = await fetch(`/0/public/Ticker?pair=${formatPair}`);
      const { result = {} } = await response.json();
      if (Object.keys(result).length > 0) {
        const currencyPairKey = Object.keys(result)[0];
        const currentPrice = result[currencyPairKey].c[0]

        if (currentPrice) {
          price = `1 ${firstCurrency.toLocaleUpperCase()} = ${formatPrice(currentPrice, 2)} ${secondCurrency.toLocaleUpperCase()}`;
        }
      }
      
    } catch (error) {}

    return {
      id: uuidv4(),
      exchange: 'KRAKEN',
      price,
    };
  },
}

export const huobiApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = 'The pair is not supported'
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      const formatPair = pair.replace('/', '')
      // const response = await fetch(`https://api.huobi.pro/market/history/kline?period=1min&size=1&symbol=${formatPair}`);
      const response = await fetch(`/market/history/kline?symbol=${formatPair}&period=1min&size=1&`);
      const { data = [] } = await response.json();
      if (data.length > 0) {
        const { close } = data[0];

        if (close) {
          price = `1 ${firstCurrency.toLocaleUpperCase()} = ${formatPrice(close, 2)} ${secondCurrency.toLocaleUpperCase()}`;
        }
      }
      
    } catch (error) {}

    return {
      id: uuidv4(),
      exchange: 'HoubiGlobal',
      price,
    };
  },
}