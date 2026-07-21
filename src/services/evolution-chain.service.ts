import api from '@/api/axios';
import type { RawEvolutionChainNode, RawEvolutionResponse } from '@/types/api/RawEvolutionResponse';
import type { EvolutionChain, EvolutionChainNode } from '@/types/domain/EvolutionChain';

function mapNode(raw: RawEvolutionChainNode): EvolutionChainNode {
  return {
    speciesName: raw.species.name,
    evolvesTo: raw.evolves_to.map(mapNode),
  };
}

export async function getEvolutionChain(chainId: number): Promise<EvolutionChain> {
  const response = await api.get<RawEvolutionResponse>(`/evolution-chain/${chainId}`);
  return { root: mapNode(response.data.chain) };
}
