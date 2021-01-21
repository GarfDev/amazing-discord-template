import { MessageEmbed, MessageEmbedOptions } from 'discord.js';
import Colors from 'constants/Colors';

const embedGenerator = (data: MessageEmbed | MessageEmbedOptions) => {
  return new MessageEmbed(data);
};

export const successEmbedGenerator = (
  data: MessageEmbed | MessageEmbedOptions
) => {
  data.color = Colors.GREEN;
  return embedGenerator(data);
};

export const failedEmbedGenerator = (
  data: MessageEmbed | MessageEmbedOptions
) => {
  data.color = Colors.RED;
  return embedGenerator(data);
};

export default embedGenerator;
