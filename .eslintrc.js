module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import"],
  rules: {
    "import/no-unresolved": "error",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    "plugin:node/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  env: {
    "jest/globals": true,
  },
  settings: {
    jest: {
      version: 27,
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
