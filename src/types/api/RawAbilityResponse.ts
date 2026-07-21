// Minimal typing of the PokeAPI `/ability/{name}` response — only the
// fields `ability.mapper.ts` reads. The real response also carries
// `generation` and non-English effect entries; unused by the app today.
export interface RawAbilityEffectEntry {
  effect: string;
  short_effect: string;
  language: {
    name: string;
  };
}

export interface RawAbilityResponse {
  name: string;
  effect_entries: RawAbilityEffectEntry[];
}
