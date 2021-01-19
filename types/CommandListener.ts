import { Message, MessageEmbed } from 'discord.js';

type CommandListener = (
  message: Message,
  ...args: string[]
) => Promise<string | MessageEmbed>;

export default CommandListener;
