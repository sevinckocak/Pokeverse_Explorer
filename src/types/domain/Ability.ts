// Deliberately no `isHidden` here — whether an ability is hidden is
// contextual to a specific Pokemon (from `PokemonDetail.abilities`), not a
// property of the ability itself. This cache is keyed by ability name and
// shared across every Pokemon that has it, so it only holds the ability's
// own static data.
export interface Ability {
  name: string;
  shortEffect: string;
}
