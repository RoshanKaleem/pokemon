module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-native|@react-native|@unimodules|expo|@expo|@react-navigation/.*|react-navigation|@react-navigation|@expo-google-fonts)",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.maestro/",
    "@react-native",
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'jest-css-modules',
  },
  testEnvironment: "jsdom",
};
