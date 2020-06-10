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
  ignorePatterns: ['**/migration/*.ts', '**/node_modules/*', '**/dist/*'],
  rules: {
    'padding-line-between-statements': ['error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'max-len': ['error', { code: 120 }],
    indent: ['error', 2],
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'no-shadow': ['error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['getters'],
      },
    ],
    'import/extensions': ['error', 'never'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': ['error', { prefixWithI: 'always' }],
  },
};
