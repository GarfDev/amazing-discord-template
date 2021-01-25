import { MessageEmbed } from 'discord.js';
import ListenerType, { ListenerTypeLabel } from 'constants/ListenerType';
import { CommandMeta, CommandMetaState } from 'core/store/types';

export const getCommandMetaByType = (type: ListenerType) => (
  commandMeta: CommandMetaState
) => commandMeta[type] || {};

export const addCommandsToEmbed = (
  embed: MessageEmbed,
  type: ListenerType,
  commands: CommandMeta
): MessageEmbed => {
  const commandsAsString = Object.keys(commands)
    .map(key => `**${commands[key].name}**: ${commands[key].helpMessage}`)
    .join('\n');

  if (commandsAsString)
    embed.addField(ListenerTypeLabel[type], commandsAsString);

  return embed;
};
