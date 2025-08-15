import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsplugin from '@typescript-eslint/eslint-plugin';
import { globalIgnores } from 'eslint/config';

export default tsplugin.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tsplugin.configs.recommended,
      reactHooks.configs['recommended'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // ✅ allow 'any' type
    },
  },
]);
