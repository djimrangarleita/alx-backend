module.exports = {
  env: {
    browser: false,
    es6: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:mocha/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['mocha'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'warn',
    'consistent-return': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'indent': ['error', 2],
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-mocha-arrows': 'off',
    "no-mixed-spaces-and-tabs": "error",
  },
  overrides:[
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    },
    {
      files: ['*.test.js'], // Specify your test files here
      rules: {
        'no-unused-expressions': 'off', // Disable the rule in test files
      },
    },
  ]
};