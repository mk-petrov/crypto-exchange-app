import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const store: Store<PairState, Action> & { dispatch: DispatchType | DispatchTypeAsset | DispatchTypeMarket } = createStore(reducer, applyMiddleware(thunk));

export default store;
