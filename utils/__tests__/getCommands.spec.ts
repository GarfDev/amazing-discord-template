import getCommands from '../getCommands';
import getStaticPath from '../getStaticPath';

test('Ping contain in Command object', () => {
  const staticPath = getStaticPath('commands');
  const commandObj = getCommands(staticPath);

  expect(commandObj).toHaveProperty('ping');
});
