module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
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
  plugins: ['@stylistic/js'],
  // eslint-disable-next-line no-dupe-keys
  extends: 'eslint:recommended',
  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/linebreak-style': ['error', 'unix'],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'never'],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  },
}
