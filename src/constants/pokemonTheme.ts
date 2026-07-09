export const STAT_MAX_VALUE = 255;

export type PokemonGradient = readonly [string, string];

export const DEFAULT_GRADIENT: PokemonGradient = ['#8E7CF2', '#5B4BC4'];

export const POKEMON_COLOR_GRADIENTS: Record<string, PokemonGradient> = {
  black: ['#5B5B66', '#232329'],
  blue: ['#5AC8FA', '#2E6BE6'],
  brown: ['#C48A5A', '#8A5A34'],
  gray: ['#B8BDC7', '#7A818C'],
  green: ['#6BD48C', '#2E9E5B'],
  pink: ['#FF9ECF', '#E85A9C'],
  purple: ['#B285F0', '#7B4FCC'],
  red: ['#FF8A80', '#E8453C'],
  white: ['#F2F4FA', '#C7CCDA'],
  yellow: ['#FFD866', '#F4A61E'],
};

export function getPokemonGradient(colorName: string | null): PokemonGradient {
  if (colorName === null) {
    return DEFAULT_GRADIENT;
  }

  return POKEMON_COLOR_GRADIENTS[colorName] ?? DEFAULT_GRADIENT;
}

// ---------------------------------------------------------------------------
// Type-based theme system.
//
// The Pokemon Detail screen currently derives its visuals from
// `species.color` via `getPokemonGradient` above. That system stays as-is —
// nothing here is wired into any screen or component yet. This is the
// infrastructure for a future migration to theming by the Pokemon's primary
// `type` (fire, water, ...) instead of its PokeAPI `color`, kept separate so
// the two systems don't collide while both exist.
// ---------------------------------------------------------------------------

export const POKEMON_TYPE_NAMES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPE_NAMES)[number];

export interface PokemonTypeTheme {
  readonly backgroundGradient: readonly [string, string];
  readonly accent: string;
  readonly cardTint: string;
  readonly progressColor: string;
  readonly chipColor: string;
  readonly glowColor: string;
}

export const POKEMON_TYPE_THEMES = {
  normal: {
    backgroundGradient: ['#C6C6A7', '#8A8A59'],
    accent: '#A8A878',
    cardTint: 'rgba(168, 168, 120, 0.16)',
    progressColor: '#A8A878',
    chipColor: '#A8A878',
    glowColor: 'rgba(168, 168, 120, 0.35)',
  },
  fire: {
    backgroundGradient: ['#F5A65A', '#DD6610'],
    accent: '#F08030',
    cardTint: 'rgba(240, 128, 48, 0.16)',
    progressColor: '#F08030',
    chipColor: '#F08030',
    glowColor: 'rgba(240, 128, 48, 0.35)',
  },
  water: {
    backgroundGradient: ['#8AACF5', '#4A6FDB'],
    accent: '#6890F0',
    cardTint: 'rgba(104, 144, 240, 0.16)',
    progressColor: '#6890F0',
    chipColor: '#6890F0',
    glowColor: 'rgba(104, 144, 240, 0.35)',
  },
  electric: {
    backgroundGradient: ['#FCE066', '#E0AC0A'],
    accent: '#F8D030',
    cardTint: 'rgba(248, 208, 48, 0.16)',
    progressColor: '#F8D030',
    chipColor: '#F8D030',
    glowColor: 'rgba(248, 208, 48, 0.35)',
  },
  grass: {
    backgroundGradient: ['#9EDD7E', '#4FA82E'],
    accent: '#78C850',
    cardTint: 'rgba(120, 200, 80, 0.16)',
    progressColor: '#78C850',
    chipColor: '#78C850',
    glowColor: 'rgba(120, 200, 80, 0.35)',
  },
  ice: {
    backgroundGradient: ['#BDEAEA', '#6FC1C1'],
    accent: '#98D8D8',
    cardTint: 'rgba(152, 216, 216, 0.16)',
    progressColor: '#98D8D8',
    chipColor: '#98D8D8',
    glowColor: 'rgba(152, 216, 216, 0.35)',
  },
  fighting: {
    backgroundGradient: ['#D9584F', '#8F1F19'],
    accent: '#C03028',
    cardTint: 'rgba(192, 48, 40, 0.16)',
    progressColor: '#C03028',
    chipColor: '#C03028',
    glowColor: 'rgba(192, 48, 40, 0.35)',
  },
  poison: {
    backgroundGradient: ['#BD6ABD', '#7A2A7A'],
    accent: '#A040A0',
    cardTint: 'rgba(160, 64, 160, 0.16)',
    progressColor: '#A040A0',
    chipColor: '#A040A0',
    glowColor: 'rgba(160, 64, 160, 0.35)',
  },
  ground: {
    backgroundGradient: ['#EAD08D', '#B89138'],
    accent: '#E0C068',
    cardTint: 'rgba(224, 192, 104, 0.16)',
    progressColor: '#E0C068',
    chipColor: '#E0C068',
    glowColor: 'rgba(224, 192, 104, 0.35)',
  },
  flying: {
    backgroundGradient: ['#C3B2F5', '#7A5AD1'],
    accent: '#A890F0',
    cardTint: 'rgba(168, 144, 240, 0.16)',
    progressColor: '#A890F0',
    chipColor: '#A890F0',
    glowColor: 'rgba(168, 144, 240, 0.35)',
  },
  psychic: {
    backgroundGradient: ['#FA85AA', '#D62E63'],
    accent: '#F85888',
    cardTint: 'rgba(248, 88, 136, 0.16)',
    progressColor: '#F85888',
    chipColor: '#F85888',
    glowColor: 'rgba(248, 88, 136, 0.35)',
  },
  bug: {
    backgroundGradient: ['#C3D454', '#7C8A12'],
    accent: '#A8B820',
    cardTint: 'rgba(168, 184, 32, 0.16)',
    progressColor: '#A8B820',
    chipColor: '#A8B820',
    glowColor: 'rgba(168, 184, 32, 0.35)',
  },
  rock: {
    backgroundGradient: ['#D0BC66', '#8C7620'],
    accent: '#B8A038',
    cardTint: 'rgba(184, 160, 56, 0.16)',
    progressColor: '#B8A038',
    chipColor: '#B8A038',
    glowColor: 'rgba(184, 160, 56, 0.35)',
  },
  ghost: {
    backgroundGradient: ['#9483B5', '#4A3A6E'],
    accent: '#705898',
    cardTint: 'rgba(112, 88, 152, 0.16)',
    progressColor: '#705898',
    chipColor: '#705898',
    glowColor: 'rgba(112, 88, 152, 0.35)',
  },
  dragon: {
    backgroundGradient: ['#9B6DFA', '#4C14D1'],
    accent: '#7038F8',
    cardTint: 'rgba(112, 56, 248, 0.16)',
    progressColor: '#7038F8',
    chipColor: '#7038F8',
    glowColor: 'rgba(112, 56, 248, 0.35)',
  },
  dark: {
    backgroundGradient: ['#8F7A6A', '#4A3826'],
    accent: '#705848',
    cardTint: 'rgba(112, 88, 72, 0.16)',
    progressColor: '#705848',
    chipColor: '#705848',
    glowColor: 'rgba(112, 88, 72, 0.35)',
  },
  steel: {
    backgroundGradient: ['#D4D4E6', '#8C8CAE'],
    accent: '#B8B8D0',
    cardTint: 'rgba(184, 184, 208, 0.16)',
    progressColor: '#B8B8D0',
    chipColor: '#B8B8D0',
    glowColor: 'rgba(184, 184, 208, 0.35)',
  },
  fairy: {
    backgroundGradient: ['#F5BFCB', '#DE6E87'],
    accent: '#EE99AC',
    cardTint: 'rgba(238, 153, 172, 0.16)',
    progressColor: '#EE99AC',
    chipColor: '#EE99AC',
    glowColor: 'rgba(238, 153, 172, 0.35)',
  },
} as const satisfies Record<PokemonTypeName, PokemonTypeTheme>;

const DEFAULT_TYPE_THEME: PokemonTypeTheme = POKEMON_TYPE_THEMES.normal;

export function isPokemonTypeName(value: string): value is PokemonTypeName {
  return (POKEMON_TYPE_NAMES as readonly string[]).includes(value);
}

export function getPokemonTheme(typeName: string | null): PokemonTypeTheme {
  if (typeName === null) {
    return DEFAULT_TYPE_THEME;
  }

  if (isPokemonTypeName(typeName)) {
    return POKEMON_TYPE_THEMES[typeName];
  }

  return DEFAULT_TYPE_THEME;
}
