import ListenerType from 'constants/ListenerType';
// { ListenerTypeLabel } from 'constants/ListenerType';
import { CommandMetaState } from 'core/store/types';
import { CommandListenerMeta } from 'types';

export const getCommandMetaByType =
  (type: ListenerType) => (commandMeta: CommandMetaState) => {
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

export const renderParentCommand = (commandMeta: CommandListenerMeta) =>
  `**${commandMeta.name}**: ${Object.keys(commandMeta.childs).map(
    (name, index) => {
      const shouldAddCommas =
        index < Object.keys(commandMeta.childs).length - 1;

      return shouldAddCommas
        ? `\`${commandMeta.childs[name].name}${
            Object.keys(commandMeta.childs[name].childs).length ? '*' : ''
          }\``
        : `\`${commandMeta.childs[name].name}${
            Object.keys(commandMeta.childs[name].childs).length ? '*' : ''
          }\`.`;
    }
  )}\n`;
