module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import"],
  rules: {
    "node/no-unsupported-features/es-syntax": "off",
    "jest/require-hook": "off",
  },
  parserOptions: {
    ecmaVersion: "12",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/all",
    "plugin:import/recommended",
    "plugin:node/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
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
    node: {
      tryExtensions: [".ts", ".json", ".js"],
    },
  },
};
