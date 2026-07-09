import type { Ability, AbilityDetail } from '@/types';

const ENGLISH_LANGUAGE_CODE = 'en';

export function mapAbilityDetailToAbility(detail: AbilityDetail, isHidden: boolean): Ability {
  const englishEntry = detail.effect_entries.find(
    (entry) => entry.language.name === ENGLISH_LANGUAGE_CODE
  );

  const effect = englishEntry?.effect ?? '';
  const shortEffect = englishEntry?.short_effect || effect;

  return {
    name: detail.name,
    shortEffect,
    effect,
    generation: detail.generation.name,
    isHidden,
  };
}
