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

type DispatchType = (args: PairAction) => PairAction