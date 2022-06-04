import React, { useEffect, useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useParams } from 'react-router-dom';

import classes from './Home.module.css';
import { UITable, UISearch } from '../../components';
import { setAssets, setPair } from '../../store/actionCreators';
import { useNavigate } from 'react-router-dom';
import { binanceApi, bitfinexApi, krakenApi, huobiApi } from '../../utils/api';


const apiCalls = [
  binanceApi.getPrice,
  bitfinexApi.getPrice,
  krakenApi.getPrice,
  huobiApi.getPrice
]

const mapper = (fns: Array<Function>, argument: string) => fns.map((fn: Function) => fn(argument))

const Home:React.FC = () => {
  // params
  const { asset: urlPair } = useParams();
  const navigate = useNavigate();

  // state
  const [currency, setCurrency] = useState('');
  // const [data, setData] = useState<any | null>(null);
  const dispatch: Dispatch<any> = useDispatch()
  const assets: Array<IAsset> = useSelector( (state: PairState) => state.assets, shallowEqual )
  const { name: selectedPair } = useSelector((state: PairState) => state.pair)

  useEffect(() => {
    const makeApiCalls = async () => {
      // TODO: add loader
      const responses = await Promise.all(mapper(apiCalls, selectedPair));
      dispatch(setAssets(responses.flat().filter(x => !!x))); // // setData(dd.flat().filter(x => !!x))
    }

    // if we have url param as currency we set it in the store
    if (urlPair && !selectedPair) {
      const formattedString = urlPair.replace('%2F', '/');
      setCurrency(formattedString);
      dispatch(setPair({ name: formattedString }));
    }

    // make api calls if we have selected pair
    if (selectedPair) {
      makeApiCalls().catch(() => {});
    }

    // add interval for 5 sec
    /*
    const interval = setInterval(() => {
      if (selectedPair) {
        makeApiCalls().catch(() => {});
      }
    }, 5 * 1000);

    // cleanup
    return () => clearInterval(interval);
    */

  }, [urlPair, selectedPair])

  const onSearchClick = React.useCallback(
    () => {
      if (currency && currency.length > 5) {
        dispatch(setPair({ name: currency }));
        navigate('/' + encodeURIComponent(currency));
      }
    },
    [ dispatch, currency ]
  )

  const onSearchChange = (e: any) => {
    setCurrency(e?.target?.value);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Crypto Exchange App</div>

      <UISearch onClick={onSearchClick} onChange={onSearchChange} value={currency} onClear={onSearchChange} />

      <div style={{ marginTop: 40 }} />

      <UITable rows={assets} />

    </div>
  );
};

export default Home;
