"use server";

import { IAuthStrategy } from "@/shared/@types/authStrategy";

export const auth = async (api: IAuthStrategy, data: any) => {
  return await api.login(data);
};
