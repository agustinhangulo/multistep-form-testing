import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import checkFile from "eslint-plugin-check-file";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      pluginQuery.configs["flat/recommended"],
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,

      // Additional plugins
      "check-file": checkFile,
    },
    ignores: ["src/vite-env.d.ts", "vite.config.ts"],
    rules: {
      // Vite rules
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Extra rules (subject to change)
      "max-depth": "warn",
      "no-else-return": "warn",
      "prefer-template": "warn",
      semi: "error",

      /** File/folder naming rules
       * React TSX files -> PascalCase (except for main/index)
       * JS/TS files -> camelCase
       * folders -> camelCase
       */
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/!(main|index).{jsx,tsx}": "PASCAL_CASE",
          "**/*.{js,ts}": "CAMEL_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!(__tests__)": "CAMEL_CASE",
        },
      ],
    },
  },
  eslintConfigPrettier,
);
