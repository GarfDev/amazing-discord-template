import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';
import { successEmbedGenerator } from 'utils/embed';

const ping: CommandHandler = async message => {
  const timeStart = message.createdAt.getTime();
  const elapsed = Math.abs(new Date().getTime() - timeStart);

  return successEmbedGenerator({
    description: `Pong! [${elapsed}ms]`
  });
};

export default listenerGenerator({
  name: 'ping',
  handler: ping,
  type: ListenerType.DEVELOPER,
  helpMessage: 'This command return a pong when you call it (Developer only)'
});
