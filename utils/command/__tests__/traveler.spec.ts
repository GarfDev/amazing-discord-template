import getCommands from 'utils/getCommands';
import getStaticPath from 'utils/getStaticPath';
import commandObjTraveler from '../traveler';

test('Can navigate to Ping command in command object', () => {
  const staticPath = getStaticPath('commands');
  const commandObj = getCommands(staticPath);
  const [command, params] = commandObjTraveler(commandObj, ['ping', 'pong']);

  expect(command).toBeInstanceOf(Function);
  expect(params).toEqual(['pong']);
});
