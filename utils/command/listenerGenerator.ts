import { useDispatch, useSelector } from '@hooks';
import ListenerType from 'constants/ListenerType';
import {
  DEFAULT_DEVELOPER_ERROR_MESSAGE,
  DEFAULT_EXECUTION_ERROR_MESSAGE,
  DEFAULT_PERMISSIONS_ERROR,
  DEFAULT_HELP_MESSAGE
} from 'constants/messages';
import { addCommandMeta } from 'core/store/actions';
import { ownerIdSelector } from 'core/store/selectors';
import { PermissionString } from 'discord.js';
import { CommandListener } from 'types';
import { failedEmbedGenerator } from 'utils/embed';
import { getLogger } from '..';

const listenerGenerator: CommandListener = ({
  name,
  type,
  handler,
  validationSchema,
  helpMessage,
  requiredPermissions = []
}) => {
  // This will make sure vars inside this anon
  // function is clearable by Garbage collector
  (function () {
    const dispatch = useDispatch();
    dispatch(addCommandMeta({ name, type, helpMessage }));
  })();
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
    if (type === ListenerType.DEVELOPER_REQUIRED) {
      const developerId = useSelector(ownerIdSelector);
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
