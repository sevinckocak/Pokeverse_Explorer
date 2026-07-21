import api from '@/api/axios';
import type { RawPokemonSpeciesResponse } from '@/types/api/RawPokemonSpeciesResponse';
import type { PokemonSpecies } from '@/types/domain/PokemonSpecies';
import { extractEvolutionChainId } from '@/utils/evolutionChain';

function resolveEvolutionChainId(url: string): number | null {
  try {
    return extractEvolutionChainId(url);
  } catch {
    return null;
  }
}

// Builds a fresh domain object from the raw response — in particular,
// resolving the evolution chain id here means Redux/UI never handle a raw
// API URL, only the number needed to fetch the chain.
function mapToPokemonSpecies(raw: RawPokemonSpeciesResponse): PokemonSpecies {
  return {
    habitat: raw.habitat ? { name: raw.habitat.name } : null,
    color: { name: raw.color.name },
    capture_rate: raw.capture_rate,
    base_happiness: raw.base_happiness,
    is_legendary: raw.is_legendary,
    is_mythical: raw.is_mythical,
    evolutionChainId: resolveEvolutionChainId(raw.evolution_chain.url),
  };
}

export async function getPokemonSpecies(
  nameOrId: string | number
): Promise<PokemonSpecies> {
  const response = await api.get<RawPokemonSpeciesResponse>(`/pokemon-species/${nameOrId}`);
  return mapToPokemonSpecies(response.data);
}
