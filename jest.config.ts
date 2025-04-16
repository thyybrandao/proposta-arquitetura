import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageReporters: ["json", "lcov", "html"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^jose": require.resolve("jose"),
    "^@panva/hkdf": require.resolve("@panva/hkdf"),
    "^uuid": require.resolve("uuid"),
    "^preact-render-to-string": require.resolve("preact-render-to-string"),
    "^preact": require.resolve("preact"),
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
  },
  transformIgnorePatterns: ["node_modules/(?!string-width|cliui|jose)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.(spec|test).ts?(x)"],
};

export default createJestConfig(config);
