// Minimal typing of the PokeAPI `/evolution-chain/{id}` response — only the
// fields `evolution-chain.service.ts` reads. Real evolution-detail nodes
// also carry trigger conditions (min level, item, time of day, ...) and a
// species `url`; unused by the app today and left untyped here.
export interface RawEvolutionChainNode {
  species: {
    name: string;
  };
  evolves_to: RawEvolutionChainNode[];
}

export interface RawEvolutionResponse {
  chain: RawEvolutionChainNode;
}
