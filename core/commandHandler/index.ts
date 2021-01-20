import { Message } from 'discord.js';
import { CommandListener } from 'types';
import { getLogger } from 'utils';

const commandHandler = async (
  command: CommandListener,
  message: Message,
  ...args: string[]
) => {
  const logger = getLogger();

  return command(message, ...args)
    .then(result => result)
    .catch(error => logger.error(error));
};

export default commandHandler;
