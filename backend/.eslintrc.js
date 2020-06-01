module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'padding-line-between-statements': ['error',
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
      { 'blankLine': 'always', 'prev': ['const', 'let'], 'next': '*' },
      { 'blankLine': 'always', 'prev': '*', 'next': ['const', 'let'] },
      { 'blankLine': 'any', 'prev': ['const', 'let'], 'next': ['const', 'let'] },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
};
