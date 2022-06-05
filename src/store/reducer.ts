import * as actionTypes from "./actionTypes"

const initialState: PairState = {
  pair: { name: '' },
  assets: [],
  exchange: ''
}

const reducer = ( state: PairState = initialState, action: Action ): PairState => {

  switch (action.type) {

    case actionTypes.SET_PAIR:
      const { name = '' } = action.payload as IPair
      return { ...state, pair: { name } }

    case  actionTypes.SET_ASSETS:
      return { ...state, assets: (action.payload as Array<IAsset>) }

    case  actionTypes.SET_MARKET:
      return { ...state, exchange: action.payload as string }

  }
  return state
}

export default reducer