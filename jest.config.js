module.exports = {
  // Automatically clear mock calls and instances between every test
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  clearMocks: true,
  verbose: true,
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  //
  moduleNameMapper: {
    '^core/(.*?)$': '<rootDir>/core/$1',
    '^utils/(.*?)$': '<rootDir>/utils/$1',
    '^@actions$': '<rootDir>/core/store/actions.ts',
    '^@hooks/(.*?)$': '<rootDir>/hooks/$1',
    '^constants/(.*?)$': '<rootDir>/constants/$1'
  }
  //
};
