import { useSelector } from '@hooks';
import { CommandHandler } from 'types';
import embedGenerator from 'utils/embed';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { commandMetaSelector } from 'core/store/selectors';
import {
  addCommandsToEmbed,
  getDeveloperCommands,
  getGeneralCommands,
  getManagerCommands
} from './utils';
import Colors from 'constants/Colors';

const help: CommandHandler = async message => {
  const commandMeta = useSelector(commandMetaSelector);
  let returnEmbed = embedGenerator({});

  // Values mapped from state
  const generalCommands = getGeneralCommands(commandMeta);
  const developerCommands = getDeveloperCommands(commandMeta);
  const managementCommand = getManagerCommands(commandMeta);

  // Settings up embed
  returnEmbed.setColor(Colors.DARK_BLUE);
  returnEmbed.setFooter(message.client.user?.username);
  returnEmbed.setTimestamp(new Date());

  // Add Commands to embed
  returnEmbed = addCommandsToEmbed(
    returnEmbed,
    ListenerType.DEVELOPER,
    developerCommands
  );

  returnEmbed = addCommandsToEmbed(
    returnEmbed,
    ListenerType.MANAGE,
    managementCommand
  );

  returnEmbed = addCommandsToEmbed(
    returnEmbed,
    ListenerType.GENERAL,
    generalCommands
  );

  // Main return
  return returnEmbed;
};

export default listenerGenerator({
  name: 'help',
  handler: help,
  type: ListenerType.GENERAL,
  helpMessage: 'Return a list of commands'
});
