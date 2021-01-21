import ListenerType from 'constants/ListenerType';

interface CommandListenerMeta {
  /** Command Name. */
  name: string;
  /** Command Handler Type. */
  type: ListenerType;
  /** Return message when wrong param input. */
  helpMessage: string;
}

export default CommandListenerMeta;
