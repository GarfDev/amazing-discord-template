import { listenerGenerator } from 'utils/command';
import ListenerType from 'constants/ListenerType';

export default listenerGenerator({
  name: 'nested',
  cooldown: 10,
  queued: false,
  type: ListenerType.GENERAL,
  helpMessage:
    'This command nested inside another command and do nothing when call it',
  usageMessage:
    'This command nested inside another command and do nothing when call it'
});
