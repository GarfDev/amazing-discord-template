import { CommandListener } from 'types';
import createEmbed from 'utils/embed';

const ping: CommandListener = async (message, ...args) => {
  const timeStart = message.createdAt.getTime();
  const elapsed = new Date().getTime() - timeStart;

  return createEmbed({
    description: `Pong! [${elapsed}ms]`
  });
};

export default ping;
