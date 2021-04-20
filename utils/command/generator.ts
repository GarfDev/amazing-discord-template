import { useDispatch, useSelector } from '@hooks';
import ListenerType from 'constants/ListenerType';
import {
  DEFAULT_DEVELOPER_ERROR_MESSAGE,
  DEFAULT_DM_REQUIRED_MESSAGE,
  DEFAULT_EXECUTION_ERROR_MESSAGE,
  DEFAULT_GUILD_REQUIRED_MESSAGE,
  DEFAULT_PERMISSIONS_ERROR
} from 'constants/messages';
import { addCommandMeta, addCooldown } from 'core/store/actions';
import { ownerIdSelector, selectCooldownById } from 'core/store/selectors';
import { PermissionString } from 'discord.js';
import { CommandListener } from 'types';
import { failedEmbedGenerator } from 'utils/embed';
import inLast from 'utils/inLast';
import { getStaticPath, getLogger } from '..';

const getCurrentLocation = () => {
  const e = new Error();
  const regex = /\((.*):(\d+):(\d+)\)$/;
  if (!e.stack) return '';
  const match = regex.exec(e.stack.split('\n')[4]);
  return match?.[1] || '';
};

const listenerGenerator: CommandListener = ({
  name,
  type,
  handler,
  helpMessage,
  usageMessage,
  validationSchema,
  requiredPermissions = [],
  guildRequired = false,
  dmRequired = false,
  cooldown = 0
}) => {
  // This will make sure vars inside this anon
  // function is clearable by Garbage collector
  (function () {
    let parent = undefined;
    const commandDepthArray = getCurrentLocation()
      .replace(getStaticPath('commands'), '')
      .replace('/index.ts', '')
      .slice(1, getCurrentLocation().length)
      ?.split('/');
    if (commandDepthArray?.length > 1) {
      parent =
        commandDepthArray[
          commandDepthArray.findIndex(item => item === name) - 1
        ];
    }

    const dispatch = useDispatch();
    dispatch(addCommandMeta({ parent, name, type, helpMessage, usageMessage }));
  })();
  // Inner scope
  return async (message, params) => {
    const isFromCorde = message.author.id === process.env.CORDE_BOT_ID;

    // Check if guild required
    if (guildRequired) {
      if (isFromCorde ? false : !message?.guild)
        return failedEmbedGenerator({
          description: DEFAULT_GUILD_REQUIRED_MESSAGE
        });
    }
    // Check if DM is required
    if (dmRequired) {
      if (message?.guild)
        return failedEmbedGenerator({
          description: DEFAULT_DM_REQUIRED_MESSAGE
        });
    }

    // Check Params
    const shouldCheckParams = !!validationSchema;
    const paramsValid = shouldCheckParams
      ? validationSchema?.isValidSync(params)
      : true;

    if (!paramsValid)
      return failedEmbedGenerator({
        description: usageMessage
      });

    // Check Developer
    // Bypass all other permission requirements
    // If this instance run on development enviroment
    const isDeveloperRequired = type === ListenerType.DEVELOPER;
    const isInProduction = process.env.NODE_ENV !== 'production';
    if (isFromCorde ? false : isDeveloperRequired && isInProduction) {
      const developerId = useSelector(ownerIdSelector);
      const isDeveloper = developerId === message.author.id;
      if (!isDeveloper)
        return failedEmbedGenerator({
          description: DEFAULT_DEVELOPER_ERROR_MESSAGE
        });
    } else {
      // Check Permissions
      // @ Bypass permission required if is DM
      const isRequiredFlags = requiredPermissions.length > 0 && !dmRequired;

      if (isRequiredFlags) {
        const userFlags = message.guild?.members.cache.get(message.author.id)
          ?.permissions;
        const validPermissions = isRequiredFlags
          ? !!(requiredPermissions as PermissionString[]).filter(requiredFlag =>
              userFlags?.toArray().find(userFlag => requiredFlag === userFlag)
            ).length
          : true;
        if (!validPermissions)
          return failedEmbedGenerator({
            description: DEFAULT_PERMISSIONS_ERROR
          });
      }
    }

    // Quick return usageMessage or
    // there no command handler
    if (!handler) {
      return failedEmbedGenerator({
        description: usageMessage
      });
    }

    // Return timeout if command
    // is used recently.
    const cooldownChecker = inLast(cooldown);
    const userCooldown = useSelector(selectCooldownById(message.author.id));
    const lastTimeCommandUsed = userCooldown?.[name];
    if (lastTimeCommandUsed && !cooldownChecker(lastTimeCommandUsed)) {
      //////////////////////
      const timeRemain = (
        cooldown -
        (message.createdTimestamp - lastTimeCommandUsed) / 1000
      ).toFixed(2);
      //////////////////////
      return failedEmbedGenerator({
        description: `You need **${timeRemain}s** before can use this command again.`
      });
    }

    // Main return
    try {
      const dispatch = useDispatch();
      const result = await handler(message, params);
      dispatch(addCooldown(message.author.id, name, new Date().getTime()));
      return result;
    } catch (error) {
      const logger = getLogger();
      logger.error(error.message);
      return failedEmbedGenerator({
        description: DEFAULT_EXECUTION_ERROR_MESSAGE
      });
    }
  };
};

export default listenerGenerator;
