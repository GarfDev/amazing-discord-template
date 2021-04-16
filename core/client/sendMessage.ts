import { Client, MessageEmbed, TextChannel } from 'discord.js';
import getClient from 'core/client';

const createSendMessageToID = (client: Client) => async (
  id: string,
  content: string | MessageEmbed
) => {
  const channel = client.channels.cache.get(id);
  if (!channel) return;

  const isTextChannel = channel.isText();
  if (!isTextChannel) return;

  (channel as TextChannel).send(content);
};

export default createSendMessageToID(getClient());
