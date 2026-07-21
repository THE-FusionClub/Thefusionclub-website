import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignore generated / unnecessary files
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".vite/**",
      "coverage/**",
    ],
  },

// JavaScript recommended rules
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Allow let when const could be used (tsconfig handles this)
      "prefer-const": "warn",
      // Allow unused assigned values (often intentional patterns)
      "no-useless-assignment": "warn",
      // Allow empty catch blocks
      "no-empty": "warn",
      // Some Three.js globals are not declared
      "no-undef": "warn",
    },
  },

  // TypeScript recommended rules
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      // Allow unused vars (tsconfig handles this with noUnusedLocals: false)
      "@typescript-eslint/no-unused-vars": "warn",
      // Warn instead of error for explicit any
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow @ts-* comments for Three.js GLSL code
      "@typescript-eslint/ban-ts-comment": "warn",
      // Allow require() imports (needed for tailwind config)
      "@typescript-eslint/no-require-imports": "warn",
      // Allow empty object types (shadcn/ui patterns)
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  })),

  // React rules
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,

    settings: {
      react: {
        version: "18.3.1",
      },
    },

    rules: {
      ...pluginReact.configs.flat.recommended.rules,

      // React 17+ / Vite automatic JSX transform
      "react/react-in-jsx-scope": "off",

      // TypeScript handles props validation
      "react/prop-types": "off",

// Allow unescaped entities in JSX (text content with quotes/apostrophes)
      "react/no-unescaped-entities": "off",
      // Allow custom DOM attributes (shadcn/ui uses cmdk-input-wrapper etc.)
      "react/no-unknown-property": "warn",
    },
  },
]);
