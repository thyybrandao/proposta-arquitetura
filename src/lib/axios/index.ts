import { urlApi } from "@/shared/constants/url_api";
import axios, { AxiosInstance } from "axios";

export class ApiInstance {
  private instance: AxiosInstance;

  constructor(locale: string) {
    this.instance = axios.create({
      baseURL: urlApi[locale],
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getInstance() {
    return this.instance;
  }
}
