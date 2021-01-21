import Yup from 'yup';
import { CommandHandler } from 'types';
import PermissionFlag from 'constants/PermissionFlag';

export interface CommandListenerProps {
  handler: CommandHandler;
  validationSchema?: Yup.AnySchema;
  requiredPermissions?: PermissionFlag[];
  helpMessage?: string;
}

type CommandListener = (options: CommandListenerProps) => CommandHandler;

export default CommandListener;
