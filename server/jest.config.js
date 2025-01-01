/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/**/*.test.js', '<rootDir>/**/*.test.jsx'],
  testTimeout: 30000
};

module.exports = config;
