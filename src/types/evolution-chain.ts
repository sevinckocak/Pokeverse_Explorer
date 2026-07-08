export interface EvolutionChainSpecies {
  name: string;
  url: string;
}

export interface EvolutionChainNode {
  species: EvolutionChainSpecies;
  evolves_to: EvolutionChainNode[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainNode;
}
