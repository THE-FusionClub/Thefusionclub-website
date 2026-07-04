import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  // Manually configure react plugin rules instead of using flat recommended (ESLint 10 compat issue)
  {
    plugins: { react: pluginReact },
    settings: {
      react: {
        version: "18.3",
      },
    },
    rules: {
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-is-mounted": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": ["error", { "ignore": ["cmdk-input-wrapper"] }],
      "react/require-render-return": "error",
      // React 18+ uses the automatic JSX transform, so React doesn't need to be in scope
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
    },
  },
  // Allow require() in config files (tailwind.config.ts, postcss.config.js, etc.)
  {
    files: ["**/*.config.ts", "**/*.config.js", "**/*.config.mjs", "**/*.config.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Relaxed rules for the existing codebase patterns
  {
    rules: {
      // Allow unused vars (common in WIP code)
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow 'any' type (common in complex UI code)
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow @ts-nocheck comments
      "@typescript-eslint/ban-ts-comment": "warn",
      // Allow empty object types
      "@typescript-eslint/no-empty-object-type": "warn",
      // prefer-const as warning
      "prefer-const": "warn",
      // Allow empty blocks
      "no-empty": "warn",
      // Allow useless assignment warnings
      "no-useless-assignment": "warn",
    },
  },
]);
