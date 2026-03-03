module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    // Add custom rules here
    '@next/next/no-img-element': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};