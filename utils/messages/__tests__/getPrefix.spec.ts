import getPrefix from '../getPrefix';

test('Initial prefix the same as the value in enviroment', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  const prefix = getPrefix();
  expect(prefix).toBe(OLD_ENV.DEFAULT_PREFIX);
});
