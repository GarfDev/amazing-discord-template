import getCommand from '../getCommand';
import getPrefix from '../getPrefix';

test('Check command is being strip correctly', () => {
  const prefix = getPrefix();
  const fakeCommand = 'test';

  expect(getCommand(prefix + fakeCommand)).toBe(fakeCommand);
});
