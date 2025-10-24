module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  plugins: ['react', 'react-native', 'unused-imports'],
  rules: {
    'react/prop-types': 'off', // Desativado pois não estamos usando PropTypes
    'react/react-in-jsx-scope': 'off', // Desativado para React 17+
    'no-unused-vars': 'warn', // Adverte sobre variáveis e funções declaradas mas nunca usadas
    'unused-imports/no-unused-imports': 'error', // Marca imports não utilizados como um erro
    'unused-imports/no-unused-vars': [
      // Regra complementar para o autofix funcionar melhor
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],
  },
};
