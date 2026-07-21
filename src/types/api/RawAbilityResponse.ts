// Minimal typing of the PokeAPI `/ability/{name}` response — only the field
// `ability.service.ts` reads today. The real response also carries
// `effect_entries` (localized effect text) and `generation`; the app
// doesn't render ability effect text yet, so those are left untyped here
// and can be added back once the Abilities drawer section needs them.
export interface RawAbilityResponse {
  name: string;
}
