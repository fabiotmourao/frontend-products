const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Diretório do seu projeto Next.js
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // Mapeia os imports de CSS para um objeto vazio
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mapeia os imports do seu projeto
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}', // Indica onde coletar informações de cobertura
    '!./src/**/_*.{js,jsx,ts,tsx}', // Exclui arquivos de setup/config
    '!./src/**/*.d.ts',             // Exclui arquivos de definição
  ],
  coverageThreshold: {
    global: {
      branches: 80,    // Exemplo: 80% de cobertura de branches
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// Garanta que o Next.js trate os caminhos corretamente
module.exports = createJestConfig(config)