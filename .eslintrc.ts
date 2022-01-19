module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "plugin:node/recommended", "jest"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  env: {
    "jest/globals": true,
  },
  settings: {
    jest: {
      version: require("jest/package.json").version,
    },
  },
};
