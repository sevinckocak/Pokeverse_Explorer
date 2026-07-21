import api from '@/api/axios';
import type { RawPokemonSpeciesGenus, RawPokemonSpeciesResponse } from '@/types/api/RawPokemonSpeciesResponse';
import type { PokemonSpecies } from '@/types/domain/PokemonSpecies';
import { extractEvolutionChainId } from '@/utils/evolutionChain';

const ENGLISH_LANGUAGE_CODE = 'en';

function resolveEvolutionChainId(url: string): number | null {
  try {
    return extractEvolutionChainId(url);
  } catch {
    return null;
  }
}

function resolveEnglishGenus(genera: RawPokemonSpeciesGenus[]): string | null {
  const englishGenus = genera.find((entry) => entry.language.name === ENGLISH_LANGUAGE_CODE);
  return englishGenus?.genus ?? null;
}

// Builds a fresh domain object from the raw response — in particular,
// resolving the evolution chain id and the English-only genus here means
// Redux/UI never handle a raw API URL or a multi-language genera list.
function mapToPokemonSpecies(raw: RawPokemonSpeciesResponse): PokemonSpecies {
  return {
    habitat: raw.habitat?.name ?? null,
    color: raw.color.name,
    captureRate: raw.capture_rate,
    baseHappiness: raw.base_happiness,
    genus: resolveEnglishGenus(raw.genera),
    isLegendary: raw.is_legendary,
    isMythical: raw.is_mythical,
    evolutionChainId: resolveEvolutionChainId(raw.evolution_chain.url),
  };
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const response = await api.get<RawPokemonSpeciesResponse>(`/pokemon-species/${nameOrId}`);
  return mapToPokemonSpecies(response.data);
}
