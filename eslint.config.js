import next from 'eslint-config-next';

/** @type {import('eslint').Linter.FlatConfig} */
export default [
  ...next(),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]; 