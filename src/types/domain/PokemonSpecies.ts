// Deliberately flat and camelCase — no nested `{ name }` resource objects,
// no snake_case. The service layer resolves the English genus and the
// evolution chain id once; nothing downstream (Redux, UI) ever sees the
// API's structure.
export interface PokemonSpecies {
  habitat: string | null;
  color: string;
  captureRate: number;
  baseHappiness: number;
  genus: string | null;
  isLegendary: boolean;
  isMythical: boolean;
  // Resolved from the raw response's `evolution_chain.url` inside the
  // service layer — Redux/UI never see a raw API URL, just the id needed
  // to fetch the evolution chain. `null` when the URL was missing or
  // malformed, so the caller can skip the follow-up fetch.
  evolutionChainId: number | null;
}
