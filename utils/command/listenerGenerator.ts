import { useSelector } from '@hooks';
import {
  DEFAULT_DEVELOPER_ERROR_MESSAGE,
  DEFAULT_EXECUTION_ERROR_MESSAGE,
  DEFAULT_PERMISSIONS_ERROR,
  DEFAULT_HELP_MESSAGE
} from 'constants/messages';
import { metadataSelector } from 'core/store/selectors';
import { PermissionString } from 'discord.js';
import { CommandListener } from 'types';
import { failedEmbedGenerator } from 'utils/embed';
import { getLogger } from '..';

const listenerGenerator: CommandListener = ({
  handler,
  validationSchema,
  isDeveloperCommand = false,
  helpMessage,
  requiredPermissions = []
}) => {
  // Closure

  // Inner scope
  return async (message, params) => {
    // Check Params
    const shouldCheckParams = !!validationSchema;
    const paramsValid = shouldCheckParams
      ? validationSchema?.isValidSync(params)
      : true;

    if (!paramsValid)
      return failedEmbedGenerator({
        description: helpMessage || DEFAULT_HELP_MESSAGE
      });

    // Check Developer
    if (isDeveloperCommand) {
      const developerId = useSelector(metadataSelector).ownerId;
      const isDeveloper = developerId === message.author.id;
      if (!isDeveloper)
        return failedEmbedGenerator({
          description: DEFAULT_DEVELOPER_ERROR_MESSAGE
        });
    }

    // Check Permissions
    const userFlags = message.guild?.member(message.author)?.permissions;
    const isRequiredFlags = requiredPermissions.length > 0;

    const validPermissions = isRequiredFlags
      ? !!((requiredPermissions as unknown) as PermissionString[]).filter(
          requiredFlag =>
            userFlags?.toArray().find(userFlag => requiredFlag === userFlag)
        ).length
      : true;

    if (!validPermissions)
      return failedEmbedGenerator({
        description: DEFAULT_PERMISSIONS_ERROR
      });

    // Main return
    try {
      return handler(message, params);
    } catch (error) {
      const logger = getLogger();
      logger.error(error);
      return failedEmbedGenerator({
        description: DEFAULT_EXECUTION_ERROR_MESSAGE
      });
    }
  };
};

export default listenerGenerator;
