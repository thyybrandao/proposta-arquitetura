import { ApiInstance } from "@/lib/axios";
import {
  IPokemon,
  IPokemonResponse,
} from "@/repositories/strategies/br/@types/pokemon";
import { IPokemonStrategy } from "@/shared/@types/pokemonStrategy";
import { AxiosInstance } from "axios";

export default class PokemonRepository implements IPokemonStrategy {
  private api: AxiosInstance;

  constructor(locale: string) {
    this.api = new ApiInstance(locale).getInstance();
  }

  async findOne(id: number): Promise<IPokemon> {
    try {
      const response = await this.api.get<IPokemon>(`pokemon/${id}/`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<IPokemonResponse> {
    try {
      const response = await this.api.get<IPokemonResponse>(
        "pokemon?offset=251&limit=135"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
