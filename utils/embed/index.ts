import { MessageEmbed, MessageEmbedOptions } from 'discord.js';

const embedGenerator = (data: MessageEmbed | MessageEmbedOptions) => {
  return new MessageEmbed(data);
};

export default embedGenerator;
