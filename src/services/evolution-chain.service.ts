import api from '@/api/axios';
import type { EvolutionChain } from '@/types';

export async function getEvolutionChain(chainId: number): Promise<EvolutionChain> {
  const response = await api.get<EvolutionChain>(`/evolution-chain/${chainId}`);
  return response.data;
}
