import ListenerType from 'constants/ListenerType';
import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
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
  type: ListenerType.DEVELOPER_REQUIRED,
  handler: ping
});
