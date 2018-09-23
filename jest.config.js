module.exports = {
  "verbose": true,
  "roots": [
    "<rootDir>/front/app"
  ],
  "moduleNameMapper": {
      "frontapp(.*)$": "<rootDir>/front/app/$1"
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/front/app/setupEnzyme.ts"
}
