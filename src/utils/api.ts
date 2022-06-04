import { v4 as uuidv4 } from 'uuid';
// import { IAsset } from '../type';

export const binanceApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    let price = 'The pair is not supported'
    try {
      const [ firstCurrency = '', secondCurrency = '' ] = pair.split('/')
      const formatPair = pair.toLocaleUpperCase().replace('/', 'B')
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${formatPair}`);
      const result = await response.json();


      if (result?.price) {
        price = `1 ${firstCurrency.toLocaleUpperCase()} = ${+result?.price} ${secondCurrency.toLocaleUpperCase()}`;
      }
      
    } catch (error) {}

    return {
      id: uuidv4(),
      exchange: 'Binance',
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