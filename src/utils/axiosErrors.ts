/**
 * Handles errors originating from Axios requests and throws a custom exception
 * based on the type of error encountered.
 *
 * @param error - The error object, which can be of any type.
 * 
 * @throws {CustomException} If the error is an AxiosError, a custom exception
 * is thrown with a specific message and status code depending on the error type:
 * - If the error has a response, the status code and message from the response are used.
 * - If the error has a request but no response, a default message and status code are used.
 * - If the error is an AxiosError but does not match the above cases, a generic message is used.
 * - If the error is not an AxiosError, a generic internal server error is thrown.
 */
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
