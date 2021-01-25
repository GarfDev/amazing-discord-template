import { MessageEmbed, MessageEmbedOptions } from 'discord.js';
import Colors from 'constants/Colors';

const embedGenerator = (
  data: MessageEmbed | MessageEmbedOptions
): MessageEmbed => {
  return new MessageEmbed(data);
};

export const successEmbedGenerator = (
  data: MessageEmbed | MessageEmbedOptions
): MessageEmbed => {
  data.color = Colors.GREEN;
  return embedGenerator(data);
};

export const failedEmbedGenerator = (
  data: MessageEmbed | MessageEmbedOptions
): MessageEmbed => {
  data.color = Colors.RED;
  return embedGenerator(data);
};

export default embedGenerator;
