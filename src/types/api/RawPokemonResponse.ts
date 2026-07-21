// Minimal typing of the PokeAPI `/pokemon/{id}` response — only the fields
// the mapping in `pokemon.service.ts` actually reads. The real response
// contains many more fields (moves, forms, game indices, stats, held
// items, ...); they are intentionally left untyped here since nothing in
// this app consumes them, and they never reach the domain model or Redux.
export interface RawPokemonTypeSlot {
  type: {
    name: string;
  };
}

export interface RawPokemonAbilitySlot {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface RawPokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface RawPokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface RawPokemonMoveSlot {
  move: {
    name: string;
  };
}

export interface RawPokemonResponse {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  weight: number;
  sprites: RawPokemonSprites;
  types: RawPokemonTypeSlot[];
  abilities: RawPokemonAbilitySlot[];
  stats: RawPokemonStat[];
  moves: RawPokemonMoveSlot[];
}
