import { FlatCompat } from '@eslint/eslintrc';

import eslintConfigPrettier from 'eslint-config-prettier';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
  // {
  //   plugins: ['simple-import-sort'],
  //   rules: {
  //     'simple-import-sort/imports': [
  //       'error',
  //       {
  //         groups: [
  //           ['^react', '^next'], // React and Next.js imports first
  //           [('^@utils/', '^@lib/')],
  //           [('^@components/', '^@types/')],
  //           ['^@store/'],
  //           ['^[a-zA-Z]'], // External modules
  //           ['^@?\\w'], // Internal modules
  //           ['^[./]'], // Relative imports
  //         ],
  //       },
  //     ],
  //     'simple-import-sort/exports': 'error',
  //   },
  // },
];

export default eslintConfig;
