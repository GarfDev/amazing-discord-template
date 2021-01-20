import { Message, MessageEmbed } from 'discord.js';

type CommandHandler = (
  message: Message,
  params: string[]
) => Promise<string | MessageEmbed>;

export default CommandHandler;
