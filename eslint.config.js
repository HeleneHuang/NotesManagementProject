import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/vue-and-js-files',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      // Prettier rules
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],

      // Vue name rules
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index']
        }
      ],

      'vue/no-setup-props-destructure': 'off',

      'no-undef': 'error'
    }
  },


  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  js.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  skipFormatting
])

