module.exports = {
  "verbose": true,
  "roots": [
    "<rootDir>/"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "setupTestFrameworkScriptFile": "<rootDir>/jestSetup.ts",
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  "moduleFileExtensions": [
    "ts",
    "js",
  ],
}
