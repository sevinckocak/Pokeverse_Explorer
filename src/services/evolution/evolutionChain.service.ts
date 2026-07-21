import api from '@/api/axios';
import type { RawEvolutionResponse } from '@/types/api/RawEvolutionResponse';
import type { Evolution } from '@/types/domain/Evolution';
import { mapToEvolution } from '@/mappers';

export async function getEvolutionChain(chainId: number): Promise<Evolution> {
  const response = await api.get<RawEvolutionResponse>(`/evolution-chain/${chainId}`);
  return mapToEvolution(response.data);
}
