import { NetworkNames } from "@enkryptcom/types";

const NetworkEndpoints = {
  [NetworkNames.Polkadot]: "https://polkadot.api.subscan.io/",
  [NetworkNames.Kusama]: "https://kusama.api.subscan.io/",
  [NetworkNames.Westend]: "https://westend.api.subscan.io/",
  [NetworkNames.Acala]: "https://acala.api.subscan.io/",
  [NetworkNames.Karura]: "https://karura.api.subscan.io/",
  [NetworkNames.Astar]: "https://astar.api.subscan.io/",
  [NetworkNames.Shiden]: "https://shiden.api.subscan.io/",
};

export { NetworkEndpoints };
