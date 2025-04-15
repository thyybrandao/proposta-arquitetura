export interface IPokemonResponse {
  count: number;
  next: string;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface IPokemon {
  sprites: {
    front_default: string;
  };
}
