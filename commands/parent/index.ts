import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';

export default listenerGenerator({
  name: 'parent',
  cooldown: 10,
  queued: false,
  type: ListenerType.GENERAL,
  helpMessage: 'This command hold a nested command',
  usageMessage: 'This command hold a nested command'
});
