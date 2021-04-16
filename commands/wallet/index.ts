import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';

export default listenerGenerator({
  name: 'wallet',
  cooldown: 10,
  queued: false,
  type: ListenerType.GENERAL,
  helpMessage: 'Contain wallet relation commands',
  usageMessage: 'Contain wallet relation commands'
});
