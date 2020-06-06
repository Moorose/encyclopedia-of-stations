module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
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
    'import/extensions': ['error', 'never'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'max-len': ['error', { code: 120 }],
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
    indent: ['error', 2],
    'operator-linebreak': 'off',
    'vue/no-parsing-error': 'off',
    'vue/valid-v-if': 'off',
    'no-param-reassign': 'off',
    'arrow-body-style': 'off',
    'no-shadow': ['error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['getters'],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
