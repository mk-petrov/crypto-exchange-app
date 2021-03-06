import * as actionTypes from "./actionTypes"

export const setPair = (payload: IPair) => {
  const action: PairAction = { type: actionTypes.SET_PAIR, payload };
  return (dispatch: DispatchType) => dispatch(action)
}

export const setAssets = (payload: Array<IAsset>) => {
  const action: AssetAction = { type: actionTypes.SET_ASSETS, payload };
  return (dispatch: DispatchTypeAsset) => dispatch(action)
}

export const setMarket = (payload: string) => {
  const action: MarketAction = { type: actionTypes.SET_MARKET, payload }
  return (dispatch: DispatchTypeMarket) => dispatch(action)
}
