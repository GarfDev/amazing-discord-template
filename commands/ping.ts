import { CommandListener } from 'types';

const ping: CommandListener = async (message, ...args) => {
  const timeStart = message.createdAt.getTime();
  const elapsed = new Date().getTime() - timeStart;

  return `pong! [${Math.abs(elapsed)}ms]`;
};

export default ping;
