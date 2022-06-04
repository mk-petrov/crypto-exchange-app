import * as actionTypes from "./actionTypes"

const initialState: PairState = {
  pair: { name: '' },
  assets: []
}

const reducer = ( state: PairState = initialState, action: Action ): PairState => {
  console.log({ action }); // TODO remove

  switch (action.type) {

    case actionTypes.SET_PAIR:
      const { name = '' } = action.payload as IPair
      return { ...state, pair: { name } }

    case  actionTypes.SET_ASSETS:
      return { ...state, assets: (action.payload as Array<IAsset>) }

  }
  return state
}

export default reducer