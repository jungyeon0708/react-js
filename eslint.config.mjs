import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import * as reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { js },
    extends: ['js/recommended', prettier],

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginReact.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
