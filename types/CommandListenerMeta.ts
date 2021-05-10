import ListenerType from 'constants/ListenerType';
import { MessageEmbed } from 'discord.js';

interface CommandListenerMeta {
  /** Command Name. */
  name: string;
  /** Command Handler Type. */
  type?: ListenerType;
  /** Return message for help command */
  helpMessage: string;
  /** Return message when wrong param input. */
  usageMessage: string | MessageEmbed;
  /** Time that user need to wait before can re-use this command */
  cooldown?: number;
  /** Should run this command in a queue or not */
  queued?: boolean;
  /** Show how depth of this command */
  depth?: number;
  /* Child of command */
  childs: {
    [key: string]: CommandListenerMeta;
  };
}

export default CommandListenerMeta;
