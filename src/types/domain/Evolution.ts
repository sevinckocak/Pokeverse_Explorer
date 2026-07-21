// Deliberately flat and self-contained — no species `url`, no raw PokeAPI
// nesting. `id`/`artwork` are resolved once inside the mapper so no
// component ever parses a species url to render a card.
export interface EvolutionNode {
  id: number | null;
  name: string;
  artwork: string | null;
  evolvesTo: EvolutionNode[];
}

export interface Evolution {
  root: EvolutionNode;
}
