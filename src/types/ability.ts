
export interface AbilityEffectEntry {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
}

export interface AbilityGeneration {
  name: string;
}

export interface AbilityDetail {
  name: string;
  effect_entries: AbilityEffectEntry[];
  generation: AbilityGeneration;
}

export interface Ability {
  name: string;
  shortEffect: string;
  effect: string;
  generation?: string;
  isHidden: boolean;
}
