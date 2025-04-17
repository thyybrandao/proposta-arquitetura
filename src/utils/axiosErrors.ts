import { CustomException } from "@/shared/exceptions/customException";
import { AxiosError } from "axios";

export function handleAxiosErrors(error: unknown): never {
  if (error instanceof AxiosError) {
    const hasResponse = !!error.response;
    const hasRequest = !!error.request && !error.response;

    if (hasResponse) {
      const statusCode = error.response!.status;
      const message =
        error.response!.data?.message ||
        `Erro na resposta da API (${statusCode})`;

      throw new CustomException(message, statusCode, false);
    }

    if (hasRequest) {
      const message = "Requisição feita, mas sem resposta do servidor";

      throw new CustomException(message, error.status || 500, false);
    }

    throw new CustomException("Erro desconhecido.", error.status || 500, false);
  }

  throw new CustomException("Erro interno de o servidor.", 500, false);
}
