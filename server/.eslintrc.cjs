module.exports = {
  // root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['import'],
  rules: {
    'linebreak-style': 0,
    'import/no-unresolved': 2,
    'import/no-commonjs': 2,
    'import/extensions': [2, 'ignorePackages'],
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
