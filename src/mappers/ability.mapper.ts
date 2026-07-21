import type { RawAbilityResponse } from '@/types/api/RawAbilityResponse';
import type { Ability } from '@/types/domain/Ability';

export function mapAbilityDetailToAbility(raw: RawAbilityResponse, isHidden: boolean): Ability {
  return {
    name: raw.name,
    isHidden,
  };
}
