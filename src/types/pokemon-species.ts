export interface PokemonSpeciesNamedResource {
  name: string;
  url: string;
}

export interface PokemonSpeciesFlavorTextEntry {
  flavor_text: string;
  language: PokemonSpeciesNamedResource;
  version: PokemonSpeciesNamedResource;
}

export interface PokemonSpeciesEvolutionChain {
  url: string;
}

export interface PokemonSpecies {
  habitat: PokemonSpeciesNamedResource | null;
  color: PokemonSpeciesNamedResource;
  capture_rate: number;
  base_happiness: number;
  is_legendary: boolean;
  is_mythical: boolean;
  flavor_text_entries: PokemonSpeciesFlavorTextEntry[];
  evolution_chain: PokemonSpeciesEvolutionChain;
}
