module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  collectCoverageFrom: ['utils.js', 'components/**/*.js', 'pages/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { configFile: './babel.config.js' }],
  },
}
