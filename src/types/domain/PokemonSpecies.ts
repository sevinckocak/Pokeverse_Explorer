export interface PokemonSpeciesNamedResource {
  name: string;
}

export interface PokemonSpecies {
  habitat: PokemonSpeciesNamedResource | null;
  color: PokemonSpeciesNamedResource;
  capture_rate: number;
  base_happiness: number;
  is_legendary: boolean;
  is_mythical: boolean;
  // Resolved from the raw response's `evolution_chain.url` inside the
  // service layer — Redux/UI never see a raw API URL, just the id needed
  // to fetch the evolution chain. `null` when the URL was missing or
  // malformed, so the caller can skip the follow-up fetch.
  evolutionChainId: number | null;
}
