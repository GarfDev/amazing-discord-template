import isCommand from '../isCommand';
import getPrefix from '../getPrefix';

test('Check command is checked correctly', () => {
  const prefix = getPrefix();
  const fakeCommand = 'test';
  expect(isCommand(prefix + fakeCommand)).toBe(true);
  expect(isCommand(fakeCommand)).toBe(false);
});
