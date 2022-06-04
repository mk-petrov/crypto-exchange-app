import React, { useEffect, useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useParams } from 'react-router-dom';

import classes from './Home.module.css';
import { UITable, UISearch } from '../../components';
import { setAssets, setPair } from '../../store/actionCreators';
import { binanceApi } from '../../utils/api'


const apiCalls = [
  binanceApi.getPrice
]

const mapper = (fns: Array<Function>, argument: string) => fns.map((fn: Function) => fn(argument))

const Home:React.FC = () => {
  // params
  const { asset: urlPair } = useParams();

  // state
  const [currency, setCurrency] = useState('');
  // const [data, setData] = useState<any | null>(null);
  const dispatch: Dispatch<any> = useDispatch()
  const assets: Array<IAsset> = useSelector( (state: PairState) => state.assets, shallowEqual )
  const { name: selectedPair } = useSelector((state: PairState) => state.pair)

  useEffect(() => {
    const makeApiCalls = async () => {
      const dd = await Promise.all(mapper(apiCalls, selectedPair))
      dispatch(setAssets(dd.flat().filter(x => !!x))) // // setData(dd.flat().filter(x => !!x))
    }

    // if we have url param as currency we set it in the store
    if (urlPair && !selectedPair) {
      const formattedString = urlPair.replace('%2F', '/')
      dispatch(setPair({ name: formattedString }))
    }

    // make api calls if we have selected pair
    if (selectedPair) {
      makeApiCalls().catch(() => {});
    }

  }, [urlPair, selectedPair])

  const onSearchClick = React.useCallback(
    () => {
      if (currency && currency.length > 5) {
        dispatch(setPair({ name: currency }))
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
