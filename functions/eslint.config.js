const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        ...globals.node,
        ...globals.es6,
      },
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    },
  },
  {
    files: ["**/*.spec.*"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
    rules: {},
  },
];
