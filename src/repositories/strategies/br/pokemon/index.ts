import { ApiInstance } from "@/lib/axios";
import {
  IPokemon,
  IPokemonResponse,
} from "@/repositories/strategies/br/@types/pokemon";
import { IPokemonStrategy } from "@/shared/@types/pokemonStrategy";
import { handleAxiosErrors } from "@/utils/axiosErrors";
import { AxiosInstance } from "axios";

export default class PokemonRepository implements IPokemonStrategy {
  private api: AxiosInstance;

  constructor(locale: string) {
    this.api = new ApiInstance(locale).getInstance();
  }

  async findOne(id: number): Promise<IPokemon> {
    try {
      const response = await this.api.get<IPokemon>(`pokemon/${id}/`);

      return response.data;
    } catch (error) {
      handleAxiosErrors(error);
    }
  }

  async findAll(): Promise<IPokemonResponse> {
    try {
      const response = await this.api.get<IPokemonResponse>(
        "pokemon?limit=151"
      );
      return response.data;
    } catch (error) {
      handleAxiosErrors(error);
    }
  }
}
