import React, { useEffect, useState } from 'react';
import { Dispatch } from "redux"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { useParams, useLocation } from 'react-router-dom';

import classes from './Home.module.css';
import { UITable, UISearch, UILoader, UIModal, UIButton, UITableDetails } from '../../components';
import { setAssets, setMarket, setPair } from '../../store/actionCreators';
import { useNavigate } from 'react-router-dom';
import { binanceApi, bitfinexApi, krakenApi, huobiApi } from '../../utils/api';
import { REFRESH_MARKET_DATA } from '../../config/constants';


const apiPriceCalls = [
  binanceApi.getPrice,
  bitfinexApi.getPrice,
  krakenApi.getPrice,
  huobiApi.getPrice
];

type apiDetailsCalls = {
  [key: string]: Function
}

const apiDetailsCalls: apiDetailsCalls = {
  'BINANCE': binanceApi.getDetails,
  'BITFINEX': bitfinexApi.getDetails,
  'KRAKEN': krakenApi.getDetails,
  'HoubiGlobal': huobiApi.getDetails
}


const mapper = (fns: Array<Function>, argument: string) => fns.map((fn: Function) => fn(argument))

const Home:React.FC = () => {
  // params
  const { asset: urlPair } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // check for modal
  const hasDetails = pathname.split('/').includes('details')

  // state
  const [ currency, setCurrency ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(hasDetails);
  const [ data, setData ] = useState<any | null>(null);
  const [ isInitialRender, setIsInitialRender ] = useState(true);
  const dispatch: Dispatch<any> = useDispatch();
  const assets: Array<IAsset> = useSelector( (state: PairState) => state.assets, shallowEqual );
  const { pair, exchange } = useSelector((state: PairState) => state);
  const { name: selectedPair } = pair;

  // handle SEARCH changes
  useEffect(() => {
    
    const makeApiCalls = async () => {

      // if (isInitialRender) {
      //   setIsLoading(true);
      // }
      const responses = await Promise.all(mapper(apiPriceCalls, selectedPair));
      dispatch(setAssets(responses.flat().filter(x => !!x))); // // setData(dd.flat().filter(x => !!x))
      // setIsLoading(false);
      // setIsInitialRender(false);
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
    const interval = setInterval(() => {
      if (selectedPair) {
        makeApiCalls().catch(() => {});
      }
    }, REFRESH_MARKET_DATA * 1000);

    // setIsLoading(false);
    // setIsInitialRender(false);

    // cleanup
    return () => clearInterval(interval);


  }, [ urlPair, selectedPair ])


  // handle MODAL changes
  useEffect(() => {
    const makeApiCalls = async () => {
      const apiRequests =  exchange ? [ apiDetailsCalls[exchange] ] : Object.values(apiDetailsCalls);
      const urlQueryPair = urlPair || ''
      const responses = await Promise.all(mapper(apiRequests, urlQueryPair));

      setData(responses.flat().filter(x => !!x))
    }

    if (isModalOpen) {
      makeApiCalls().catch(() => {});
    }

  }, [isModalOpen, exchange, selectedPair])

  const onSearchClick = React.useCallback(
    () => {
      if (currency && currency.length > 5) {
        dispatch(setPair({ name: currency }));
        navigate('/' + encodeURIComponent(currency));
        setIsInitialRender(true);
      }
    },
    [ dispatch, currency ]
  )

  const onSearchChange = (e: any) => {
    setCurrency(e?.target?.value);
  };

  const onModalToggle = (bool = false) => {
    if (!bool) {
      // we change the url if the modal is closed
      const path = pathname.split('/').filter(p => p !== 'details')
      navigate(path.join('/'))
    }
    setIsModalOpen(bool);
  }

  const onRowClick = (exchange: string) => {
    onModalToggle(true);
    navigate(`${pathname}/details`);
    dispatch(setMarket(exchange));
  }

  const onOpenDetailsBtnClick = () => {
    dispatch(setMarket(''));
    navigate(`${pathname}/details`);
    onModalToggle(true);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Crypto Exchange App</div>

      <UISearch onClick={onSearchClick} onChange={onSearchChange} value={currency} onClear={onSearchChange} />

      <div style={{ marginTop: 40 }} />

      

      { isLoading ? <UILoader /> : (
        <>
          <UITable rows={assets} onRowClick={onRowClick} />

          { assets && assets.length > 0 && (
            <UIButton onClickHandler={onOpenDetailsBtnClick} label='Show historical information' />
          )}
          
        </>
      ) }

      <UIModal isOpen={isModalOpen} onClose={onModalToggle}>
        { data && data.length > 0 ? (<UITableDetails rows={data} />) : (<div style={{ color: '#fff', textAlign: 'center' }}>Invalid Currency Pair</div>) }
      </UIModal>

    </div>
  );
};

export default Home;
