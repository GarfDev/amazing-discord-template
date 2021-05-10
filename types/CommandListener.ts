import Yup from 'yup';
import { CommandHandler } from 'types';
import PermissionFlag from 'constants/PermissionFlag';
import CommandListenerMeta from './CommandListenerMeta';

export interface CommandListenerProps
  extends Omit<CommandListenerMeta, 'childs'>,
    Partial<Pick<CommandListenerMeta, 'childs'>> {
  /** Command Handler if pass all checks. */
  handler?: CommandHandler;
  /** An schema that check input params is correct or not. */
  validationSchema?: Yup.AnySchema;
  /** Required permission for member in a guide to use this command. */
  requiredPermissions?: PermissionFlag[];
  /** Required roles for member in a guide to use this command. */
  requiredRoles?: PermissionFlag[];
  /** Is this command only useable in a guild */
  guildRequired?: boolean;
  /** Is this command only useable in a DM */
  dmRequired?: boolean;
}

type CommandListener = (options: CommandListenerProps) => CommandHandler;

export default CommandListener;
