/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  testMatch: [ '**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)' ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/tests/unit/mocks/mockFiles.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/',],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.[jt]sx?$': 'babel-jest'
  },
  // verbose: false,
};