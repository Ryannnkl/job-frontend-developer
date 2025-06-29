import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      indent: ["error", 2],
      semi: ["error", "always"],
      quotes: ["error", "double", { "avoidEscape": true }],
      "prefer-arrow-callback": ["error"],
      "prefer-const": ["error"],
      "prefer-destructuring": ["error"],
      "prefer-template": ["error"],
      "no-multiple-empty-lines": ["error", { max: 1 }]
    }
  })
];

export default eslintConfig;