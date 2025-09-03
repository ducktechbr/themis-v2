const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  // Configuração de arquivos ignorados
  {
    ignores: [
      "src/screens/app/asopay/**/*",
      "node_modules/**/*",
      "dist/**/*",
      ".expo/**/*",
      "*.min.js",
      "*.bundle.js",
    ],
  },

  // Configuração base recomendada do ESLint
  js.configs.recommended,

  // Configuração específica para TypeScript/TSX
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        FormData: "readonly",
        fetch: "readonly",
        process: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        alert: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "import/order": [
        "warn",
        {
          groups: [
            "builtin", // fs, path, etc
            "external", // react, lodash
            "internal", // @src/*
            ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },
];
