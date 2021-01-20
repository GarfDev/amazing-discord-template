import Yup from 'yup';
import { CommandHandler } from 'types';
import { UserFlagsString } from 'discord.js';

export interface CommandListenerProps {
  handler: CommandHandler;
  validationSchema?: Yup.AnySchema;
  requiredPermissions?: UserFlagsString[];
  helpMessage?: string;
}

type CommandListener = (options: CommandListenerProps) => CommandHandler;

export default CommandListener;
