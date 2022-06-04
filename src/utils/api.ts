import { v4 as uuidv4 } from 'uuid';
// import { IAsset } from '../type';

export const binanceApi = {
  getPrice: async (pair: string):Promise<IAsset | null> => {
    try {
      const formatPair = pair.toLocaleUpperCase().replace('/', 'B')
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${formatPair}`);
      const result = await response.json();

      return {
        id: uuidv4(),
        exchange: 'Binance',
        price: result?.price
      };
    } catch (error) {
      console.error(error)
      return null
    }
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