interface IPair {
  name: string;
}

interface IAsset {
  price: string;
  exchange: string;
  id: string;
}

type PairState = {
  pair: IPair;
  assets: Array<IAsset>;
  exchange: string;
}

type PairAction = {
  type: string;
  payload: IPair
}

type AssetAction = {
  type: string;
  payload: Array<IAsset>
}

type MarketAction = {
  type: string;
  payload: string;
}

type Action = PairAction | AssetAction | MarketAction

type DispatchType = (args: PairAction) => PairAction
type DispatchTypeAsset = (args: AssetAction) => AssetAction
type DispatchTypeMarket = (args: MarketAction) => MarketAction