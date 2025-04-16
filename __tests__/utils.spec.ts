/**
 * @jest-environment jsdom
 */

import { getLocale } from "../src/utils/host"; // Ajuste o caminho conforme necessário

describe("getLocale", () => {
  it("should extract the locale from a host string without a port", () => {
    const host = "en.example.com";
    const result = getLocale(host);
    expect(result).toBe("en");
  });

  it("should extract the locale from a host string with a port", () => {
    const host = "en.example.com:3000";
    const result = getLocale(host);
    expect(result).toBe("en");
  });

  it("should return undefined for a null host", () => {
    const host = null as unknown as string;
    const result = getLocale(host);
    expect(result).toBeUndefined();
  });

  it("should return undefined for an undefined host", () => {
    const host = undefined as unknown as string;
    const result = getLocale(host);
    expect(result).toBeUndefined();
  });

  it("should handle a host string without dots", () => {
    const host = "localhost";
    const result = getLocale(host);
    expect(result).toBe("localhost");
  });

  it("should handle a host string with only a port", () => {
    const host = ":3000";
    const result = getLocale(host);
    expect(result).toBe("");
  });
});
