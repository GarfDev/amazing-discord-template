import { Message } from 'discord.js';
import { CommandListener } from 'types';

const commandHandler = (
  command: CommandListener,
  message: Message,
  ...args: string[]
) =>
  command(message, ...args)
    .then(result => result)
    .catch(() => 'Error while..');

export default commandHandler;
