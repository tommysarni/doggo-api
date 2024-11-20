export default {
  testEnvironment: 'node',
  transform: { '^.+\\.m?[tj]sx?$': 'babel-jest' },
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)/',
  ],
};