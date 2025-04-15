"use server";

import {
  IPokemon,
  IPokemonResponse,
} from "@/repositories/strategies/br/@types/pokemon";
import { PokemonRepository } from "@/repositories/strategies/br/pokemon";
import { IAuthStrategy } from "@/shared/@types/pokemonStrategy";

export async function findAllPokemon(
  repository: PokemonRepository
): Promise<IPokemonResponse> {
  return await repository.findAll();
}

export async function findOnePokemon(
  repository: PokemonRepository,
  id: number
): Promise<IPokemon> {
  return await repository.findOne(id);
}
