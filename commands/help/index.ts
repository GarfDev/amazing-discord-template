import { useSelector } from '@hooks';
import { CommandHandler } from 'types';
import embedGenerator from 'utils/embed';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { commandMetaSelector } from 'core/store/selectors';
import { addCommandsToEmbed, getCommandMetaByType } from './utils';
import Colors from 'constants/Colors';

const help: CommandHandler = async message => {
  const commandMeta = useSelector(commandMetaSelector);
  let returnEmbed = embedGenerator({});

  // Values mapped from props
  const listenerTypeObject = { ...ListenerType };

  // Settings up embed
  returnEmbed.setColor(Colors.DARK_BLUE);
  returnEmbed.setFooter(message.client.user?.username);
  returnEmbed.setTimestamp(new Date());

  // Add Commands to embed

  Object.keys(listenerTypeObject).forEach(type => {
    const commands = getCommandMetaByType(type as ListenerType)(commandMeta);
    returnEmbed = addCommandsToEmbed(
      returnEmbed,
      type as ListenerType,
      commands
    );
  });

  // Main return
  return returnEmbed;
};

export default listenerGenerator({
  name: 'help',
  handler: help,
  type: ListenerType.GENERAL,
  helpMessage: 'Return a list of commands',
  usageMessage: 'Return a list of commands'
});
