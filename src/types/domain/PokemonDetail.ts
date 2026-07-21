export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

// `name` is the raw PokeAPI stat slug ("hp", "attack", "special-attack",
// ...) — used directly as an i18n key suffix (`pokemonDetail.stat.${name}`)
// rather than invented camelCase names, so no lookup table is needed.
export interface PokemonStat {
  name: string;
  value: number;
}

// Deliberately flat and camelCase — no `sprites.other["official-artwork"]`,
// no `type: { name }` / `ability: { name }` wrapper objects, no snake_case.
// The service layer maps PokeAPI's nested, snake_case response into this
// shape once; nothing downstream (Redux, UI) ever sees the API's structure.
export interface PokemonDetail {
  id: number;
  name: string;
  baseExperience: number | null;
  height: number;
  weight: number;
  thumbnail: string | null;
  artwork: string | null;
  types: string[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}
