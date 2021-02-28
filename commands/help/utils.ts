import { MessageEmbed } from 'discord.js';
import ListenerType, { ListenerTypeLabel } from 'constants/ListenerType';
import { CommandMetaState } from 'core/store/types';
import { CommandListenerMeta } from 'types';

export const getCommandMetaByType = (type: ListenerType) => (
  commandMeta: CommandMetaState
) => {
  const filteredCommandMeta: CommandMetaState = {};

  Object.keys(commandMeta).forEach(key => {
    if (commandMeta[key].type === type) {
      filteredCommandMeta[key] = commandMeta[key];
    }
  });

  return filteredCommandMeta;
};

export const renderSingleCommand = (commandMeta: CommandListenerMeta) =>
  `**${commandMeta.name}**: ${commandMeta.helpMessage}\n`;

export const renderParentCommand = (
  commandMeta: CommandListenerMeta,
  nestedCommands: CommandListenerMeta[]
) =>
  `**${commandMeta.name}**: ${nestedCommands.map((command, index) => {
    const shouldAddCommas = index < nestedCommands.length - 1;
    return shouldAddCommas ? `\`${command.name}\`` : `\`${command.name}\`.`;
  })}\n`;

export const addCommandsToEmbed = (
  embed: MessageEmbed,
  type: ListenerType,
  commands: CommandMetaState
): MessageEmbed => {
  const commandKeys = Object.keys(commands);
  let commandsAsString = '';

  commandKeys.forEach(key => {
    // Removing out nested commands from main list
    if (commands[key].parent) return;

    const nestedCommands = commandKeys.filter(
      nestedKey => commands[nestedKey].parent === key
    );

    if (nestedCommands.length) {
      const nestedCommandMeta = nestedCommands.map(key => commands[key]);
      commandsAsString += renderParentCommand(commands[key], nestedCommandMeta);
      return;
    }
    commandsAsString += renderSingleCommand(commands[key]);
  });

  if (commandsAsString)
    embed.addField(ListenerTypeLabel[type], commandsAsString);

  return embed;
};
