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
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
      { 'blankLine': 'always', 'prev': ['const', 'let'], 'next': '*' },
      { 'blankLine': 'always', 'prev': '*', 'next': ['const', 'let'] },
      { 'blankLine': 'any', 'prev': ['const', 'let'], 'next': ['const', 'let'] },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    indent: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
