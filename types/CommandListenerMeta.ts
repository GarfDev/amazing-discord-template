import ListenerType from 'constants/ListenerType';

interface CommandListenerMeta {
  /** Command Name. */
  name: string;
  /** Command Handler Type. */
  type: ListenerType;
  /** Return message for help command */
  helpMessage: string;
  /** Return message when wrong param input. */
  usageMessage: string;
}

export default CommandListenerMeta;
