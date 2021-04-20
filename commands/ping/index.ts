import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { successEmbedGenerator } from 'utils/embed';

const ping: CommandHandler = async () => {
  return successEmbedGenerator({
    description: `Pong!`
  });
};

export default listenerGenerator({
  name: 'ping',
  cooldown: 10,
  queued: false,
  handler: ping,
  type: ListenerType.GENERAL,
  helpMessage: 'This command return a pong when you call it (Developer only)',
  usageMessage: 'This command return a pong when you call it (Developer only)'
});
