import ListenerType from 'constants/ListenerType';

interface CommandListenerMeta {
  /** Parent of this command. */
  parent?: string;
  /** Command Name. */
  name: string;
  /** Command Handler Type. */
  type?: ListenerType;
  /** Return message for help command */
  helpMessage: string;
  /** Return message when wrong param input. */
  usageMessage: string;
  /** Time that user need to wait before can re-use this command */
  cooldown?: number;
  /** Should run this command in a queue or not */
  queued?: boolean;
}

export default CommandListenerMeta;
