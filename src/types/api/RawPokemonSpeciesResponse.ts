// Minimal typing of the PokeAPI `/pokemon-species/{id}` response — only the
// fields `pokemon-species.service.ts` reads. The real response also
// includes flavor text, genera, egg groups, growth rate, and more; those
// are unused by the app today and are left untyped here.
export interface RawPokemonSpeciesNamedResource {
  name: string;
}

export interface RawPokemonSpeciesResponse {
  habitat: RawPokemonSpeciesNamedResource | null;
  color: RawPokemonSpeciesNamedResource;
  capture_rate: number;
  base_happiness: number;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: {
    url: string;
  };
}
