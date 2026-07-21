import type { RawEvolutionChainNode, RawEvolutionResponse } from '@/types/api/RawEvolutionResponse';
import type { Evolution, EvolutionNode } from '@/types/domain/Evolution';
import { getPokemonArtworkUrl } from '@/utils/pokemonAssets';

const SPECIES_URL_ID_PATTERN = /\/pokemon-species\/(\d+)\/?$/;

function extractSpeciesId(url: string): number | null {
  const match = url.match(SPECIES_URL_ID_PATTERN);
  return match ? Number(match[1]) : null;
}

function mapNode(raw: RawEvolutionChainNode): EvolutionNode {
  const id = extractSpeciesId(raw.species.url);

  return {
    id,
    name: raw.species.name,
    artwork: id !== null ? getPokemonArtworkUrl(id) : null,
    evolvesTo: raw.evolves_to.map(mapNode),
  };
}

export function mapToEvolution(raw: RawEvolutionResponse): Evolution {
  return { root: mapNode(raw.chain) };
}
