module.exports = {
  "verbose": true,
  "roots": [
    "<rootDir>/app"
  ],
  "moduleNameMapper": {
      "frontapp(.*)$": "<rootDir>/app/$1",
      "\\.css$": "<rootDir>/__mocks__/styleMock.js"
  },
  "transform": {
    "^.+\\.tsx?$": 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/../../node_modules/(?!apicaballero)'],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/app/setupEnzyme.ts"
}
