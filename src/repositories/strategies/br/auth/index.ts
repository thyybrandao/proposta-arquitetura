import { ApiInstance } from "@/lib/axios";
import { IAuthStrategy } from "@/shared/@types/authStrategy";
import { AxiosInstance } from "axios";

export class AuthRepository implements IAuthStrategy {
  private api: AxiosInstance;

  private constructor(locale: string) {
    this.api = new ApiInstance(locale).getInstance();
  }

  public async login(data: any): Promise<any> {
    try {
      const response = await this.api.post("/login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
