export interface EvolutionChainNode {
  speciesName: string;
  evolvesTo: EvolutionChainNode[];
}

export interface EvolutionChain {
  root: EvolutionChainNode;
}
