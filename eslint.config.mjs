import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),

  {
    rules: {
      // unused import 제거
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],

      // import 정렬
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // tailwind class 정렬
      'tailwindcss/classnames-order': 'warn',
    },
  },
];
export default eslintConfig;
