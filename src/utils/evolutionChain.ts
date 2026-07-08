const EVOLUTION_CHAIN_URL_PATTERN = /\/evolution-chain\/(\d+)\/?$/;

export function extractEvolutionChainId(url: string): number {
  const match = url.match(EVOLUTION_CHAIN_URL_PATTERN);

  if (match === null) {
    throw new Error(`Invalid evolution chain URL: ${url}`);
  }

  return Number(match[1]);
}
