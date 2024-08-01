module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
