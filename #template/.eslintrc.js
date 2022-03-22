module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 0
  }
}