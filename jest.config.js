/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.js"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/tests"],
};

module.exports = config;
