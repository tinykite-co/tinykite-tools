import eslintPluginImport from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const tsFiles = ["**/*.ts", "**/*.tsx"];

const restrictedDomGlobals = [
  { name: "window", message: "DOM globals are not allowed in packages." },
  { name: "document", message: "DOM globals are not allowed in packages." },
  { name: "navigator", message: "DOM globals are not allowed in packages." },
  { name: "location", message: "DOM globals are not allowed in packages." },
  { name: "localStorage", message: "DOM globals are not allowed in packages." },
  { name: "sessionStorage", message: "DOM globals are not allowed in packages." }
];

export default [
  {
    ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**", "**/.turbo/**"]
  },
  {
    files: tsFiles,
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true
      }
    },
    plugins: {
      import: eslintPluginImport,
      "@typescript-eslint": tseslint
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "max-lines": ["error", { "max": 400, "skipBlankLines": true, "skipComments": true }]
    }
  },
  {
    files: ["packages/**/*.ts", "packages/**/*.tsx"],
    rules: {
      "no-restricted-globals": ["error", ...restrictedDomGlobals]
    }
  }
];
