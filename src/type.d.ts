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
  assets: Array<IAsset>
}

type PairAction = {
  type: string;
  payload: IPair
}

type AssetAction = {
  type: string;
  payload: Array<IAsset>
}

type Action = PairAction | AssetAction

type DispatchType = (args: PairAction) => PairAction
type DispatchTypeAsset = (args: AssetAction) => AssetAction