export default [
  {
    // 'plugin:vue/vue3-recommended'
    extends: ['plugin:prettier/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'vue/attribute-hyphenation': ['error'],
    },
  },
]
