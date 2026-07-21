import type { RawAbilityResponse } from '@/types/api/RawAbilityResponse';
import type { Ability } from '@/types/domain/Ability';

const ENGLISH_LANGUAGE_CODE = 'en';

export function mapAbilityDetailToAbility(raw: RawAbilityResponse): Ability {
  const englishEntry = raw.effect_entries.find(
    (entry) => entry.language.name === ENGLISH_LANGUAGE_CODE
  );

  const effect = englishEntry?.effect ?? '';
  const shortEffect = englishEntry?.short_effect || effect;

  return {
    name: raw.name,
    shortEffect,
  };
}
