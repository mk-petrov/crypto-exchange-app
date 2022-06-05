import { v4 as uuidv4 } from 'uuid';
import { formatPrice } from './helpers';
import { PAIR_NOT_SUPPORTED, PAIR_LAST_TRADES } from '../config/constants';

export const binanceApi = {

  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = PAIR_NOT_SUPPORTED
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

  getDetails: async (pair: string) => {

    let trades = []
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/');
      let formatPair = pair.toLocaleUpperCase().replace('%2F', 'B');
      formatPair = formatPair.toLocaleUpperCase().replace('/', 'B');

      const response = await fetch(`/v3/trades?limit=${PAIR_LAST_TRADES}&symbol=${formatPair}`);
      const data = await response.json();

      if (data.length > 0) {
        trades = data.reduce((acc: any, el: any) => {

          acc.push({
            direction: el.isBuyerMaker ? 'buy' : 'sell',
            amount: el.qty,
            id: uuidv4(),
            price: formatPrice(el.price, 2),
            pair: pair,
            dateTime: new Date(el.time)
          });
          return acc;
        }, [])
      }
      
    } catch (error) {}

    return trades;
  }
}

export const bitfinexApi = {

  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = PAIR_NOT_SUPPORTED
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

  getDetails: async (pair: string) => {

    let trades = []
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      let formatPair = pair.replace('%2F', '')
      formatPair = formatPair.toLocaleUpperCase().replace('/', '')

      const response = await fetch(`/v2/trades/t${formatPair}/hist?limit=${PAIR_LAST_TRADES}`);
      const data = await response.json();

      if (data.length > 0) {
        trades = data.reduce((acc: any, el: any) => {

          acc.push({
            direction: 0 < el[2] ? 'buy' : 'sell',
            amount: el[2],
            id: el[0],
            price: formatPrice(el[3], 2),
            pair: pair,
            dateTime: new Date(el[1])
          });
          return acc;
        }, [])
      }
      
    } catch (error) {}

    return trades;
  }
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

  getDetails: async (pair: string) => {

    let trades = []
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      let formatPair = pair.replace('%2F', '')
      formatPair = formatPair.toLocaleUpperCase().replace('/', '')

      const response = await fetch(`/0/public/Trades?pair=${formatPair}`);
      const { result = {} } = await response.json();

      if (Object.keys(result).length > 0) {
        const currencyPairKey = Object.keys(result)[0];
        const allTrades = result[currencyPairKey] || [];
        const wantedTrades = allTrades.slice(0, PAIR_LAST_TRADES) || [];

        if (wantedTrades.length > 0) {
          trades = wantedTrades.reduce((acc: any, el: any) => {
            const dateTime = el[2].toString().split('.')[0];

            acc.push({
              direction: 'b' === el[3] ? 'buy' : 'sell',
              amount: el[1],
              id: uuidv4(),
              price: formatPrice(el[0], 2),
              pair: pair,
              dateTime: new Date(dateTime * 1000)
            })
            return acc;
          }, [])

        }
      }

    } catch (error) {}

    return trades;
  }
}

export const huobiApi = {

  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = PAIR_NOT_SUPPORTED
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

  getDetails: async (pair: string) => {

    let trades = []
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      let formatPair = pair.replace('%2F', '')
      formatPair = formatPair.replace('/', '')

      const response = await fetch(`/market/history/trade?size=${PAIR_LAST_TRADES}&symbol=${formatPair}`);
      const { data = [] } = await response.json();
      if (data.length > 0) {
        trades = data.reduce((acc: any, el: any) => {
          const data = el?.data?.[0];

          acc.push({
            direction: data.direction,
            amount: data.amount,
            id: data.id,
            price: formatPrice(data.price, 2),
            pair: pair,
            dateTime: new Date(data.ts) //data.ts
          });
          return acc;
        }, [])
      }
      
    } catch (error) {}

    return trades;
  }
}
