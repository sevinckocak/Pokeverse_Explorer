import api from '@/api/axios';
import type { RawAbilityResponse } from '@/types/api/RawAbilityResponse';
import type { Ability } from '@/types/domain/Ability';
import { mapAbilityDetailToAbility } from '@/mappers';

export async function getAbilityByName(name: string): Promise<Ability> {
  const response = await api.get<RawAbilityResponse>(`/ability/${name}`);
  return mapAbilityDetailToAbility(response.data);
}
