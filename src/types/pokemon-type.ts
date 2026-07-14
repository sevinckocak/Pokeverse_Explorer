export interface PokemonTypeMember {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeDetail {
  name: string;
  pokemon: PokemonTypeMember[];
}
