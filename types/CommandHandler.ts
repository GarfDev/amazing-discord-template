import { Message, MessageEmbed } from 'discord.js';

type CommandHandler = (
  message: Message,
  params: string[]
) => Promise<string | MessageEmbed | void | undefined>;

export default CommandHandler;
