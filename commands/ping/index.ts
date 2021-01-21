import { CommandHandler } from 'types';
import { listenerGenerator } from 'utils/command';
import createEmbed from 'utils/embed';
import PermissionFlag from 'constants/PermissionFlag';

const ping: CommandHandler = async (message, params) => {
  const timeStart = message.createdAt.getTime();
  const elapsed = Math.abs(new Date().getTime() - timeStart);

  return createEmbed({
    description: `Pong! [${elapsed}ms]`
  });
};

export default listenerGenerator({
  handler: ping,
  requiredPermissions: [PermissionFlag.ADD_REACTIONS]
});
