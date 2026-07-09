import api from '@/api/axios';
import type { AbilityDetail } from '@/types';

export async function getAbilityByName(name: string): Promise<AbilityDetail> {
  const response = await api.get<AbilityDetail>(`/ability/${name}`);
  return response.data;
}
