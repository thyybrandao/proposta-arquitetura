
/**
 * Extracts the locale from a given host string.
 *
 * The function splits the host string by the colon (`:`) to remove any port information,
 * and then splits the resulting string by the dot (`.`) to extract the first segment,
 * which is assumed to represent the locale.
 *
 * @param host - The host string from which to extract the locale. It may include a port (e.g., "en.example.com:3000").
 * @returns The locale extracted from the host string, or `undefined` if the input is invalid or cannot be processed.
 */
export const getLocale = (host: string) => {
  const hostSplit = host?.split(":")[0];
  return hostSplit?.split(".")[0];
};
