import Yup from 'yup';
import { CommandHandler } from 'types';
import PermissionFlag from 'constants/PermissionFlag';

export interface CommandListenerProps {
  /** Command Handler if pass all checks. */
  handler: CommandHandler;
  /** An schema that check input params is correct or not. */
  validationSchema?: Yup.AnySchema;
  /** Required permission for member in a guide to use this command. */
  requiredPermissions?: PermissionFlag[];
  /** Should this command only available for it Developer. */
  isDeveloperCommand?: boolean;
  /** Return message when wrong param input. */
  helpMessage?: string;
}

type CommandListener = (options: CommandListenerProps) => CommandHandler;

export default CommandListener;
