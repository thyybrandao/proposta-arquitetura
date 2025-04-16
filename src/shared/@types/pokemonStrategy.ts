import { IPokemon, IPokemonResponse } from "@/repositories/strategies/br/@types/pokemon";

export interface IPokemonStrategy {
  findAll(): Promise<IPokemonResponse>;
  findOne(id: number): Promise<IPokemon>;
}
