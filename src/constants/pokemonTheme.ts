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
