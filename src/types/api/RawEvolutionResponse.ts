// Minimal typing of the PokeAPI `/evolution-chain/{id}` response — only the
// fields `evolution.mapper.ts` reads. Real evolution-detail nodes also
// carry trigger conditions (min level, item, time of day, ...); unused by
// the app today and left untyped here. `species.url` is kept (a
// `/pokemon-species/{id}/` link) because the mapper resolves it into the
// numeric id used to build each stage's artwork url.
export interface RawEvolutionChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: RawEvolutionChainNode[];
}

export interface RawEvolutionResponse {
  chain: RawEvolutionChainNode;
}
