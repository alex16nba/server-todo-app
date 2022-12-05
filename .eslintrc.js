module.exports = {
  env: {
    browser: true,
    mocha: true,
    es2021: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'max-len': [2, 120, 2, {
      ignoreUrls: true,
      ignoreComments: true,
    }],
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'no-dynamic-require': 0,
    'no-use-before-define': 0,
    'linebreak-style': 0,
    'global-require': 0,
  },
};
