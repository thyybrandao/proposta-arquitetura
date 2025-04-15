import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Pokemons {
  name: string;
  image: string;
}

interface MyPokemonsState {
  pokemons: Pokemons[];
  add: (pokemon: Pokemons) => void;
  remove: (pokemonName: string) => void;
}

export const useMyPokemonStore = create<MyPokemonsState>()(
  persist(
    (set) => ({
      pokemons: [],
      add: (pokemon) =>
        set((state) => ({ pokemons: [...state.pokemons, pokemon] })),
      remove: (pokemonName) =>
        set((state) => ({
          pokemons: state.pokemons.filter((p) => p.name !== pokemonName),
        })),
    }),
    { name: "pokemonStore" }
  )
);
