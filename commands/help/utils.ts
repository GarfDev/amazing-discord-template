import { MessageEmbed } from 'discord.js';
import ListenerType, { ListenerTypeLabel } from 'constants/ListenerType';
import { CommandMeta, CommandMetaState } from 'core/store/types';

export const getCommandMetaByType = (type: ListenerType) => (
  commandMeta: CommandMetaState
) => commandMeta[type] || {};

export const getGeneralCommands = getCommandMetaByType(ListenerType.GENERAL);
export const getDeveloperCommands = getCommandMetaByType(
  ListenerType.DEVELOPER
);
export const getManagerCommands = getCommandMetaByType(ListenerType.MANAGE);

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
