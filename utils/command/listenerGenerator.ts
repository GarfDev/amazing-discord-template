import {
  DEFAULT_EXECUTION_ERROR_MESSAGE,
  DEFAULT_HELP_MESSAGE,
  DEFAULT_PERMISSIONS_ERROR
} from 'constants/messages';
import { CommandListener } from 'types';
import { getLogger } from '..';

const listenerGenerator: CommandListener = ({
  handler,
  validationSchema,
  helpMessage,
  requiredPermissions = []
}) => {
  // Closure

  // Inner scope
  return async (message, params) => {
    // Check Params
    const paramsError = validationSchema?.isValidSync(params);

    if (paramsError) return helpMessage || DEFAULT_HELP_MESSAGE;

    // Check Permissions
    const userFlags = message.author.flags;
    const isRequiredFlags = requiredPermissions.length > 0;
    const validPermissions = isRequiredFlags
      ? !!requiredPermissions.filter(requiredFlag =>
          userFlags?.toArray().find(userFlag => requiredFlag === userFlag)
        ).length
      : true;

    if (!validPermissions) return DEFAULT_PERMISSIONS_ERROR;

    // Main return
    try {
      return handler(message, params);
    } catch (error) {
      const logger = getLogger();
      logger.error(error);
      return DEFAULT_EXECUTION_ERROR_MESSAGE;
    }
  };
};

export default listenerGenerator;
