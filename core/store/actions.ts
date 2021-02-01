import { Message } from 'discord.js';
import { action } from 'typesafe-actions';
import { CommandListenerMeta } from 'types';
import ActionTypes from './actionTypes';

export const initApplication = () => action(ActionTypes.INIT_APPLICATION);

export const initApplicationSuccess = () =>
  action(ActionTypes.INIT_APPLICATION_SUCCESS);

export const runCommand = (message: Message) =>
  action(ActionTypes.RUN_COMMAND, { message });

export const addCommandMeta = (meta: CommandListenerMeta) =>
  action(ActionTypes.ADD_COMMAND_META, { meta });

export const addCooldown = (
  userId: string,
  command: string,
  lastCommandTime: number
) => action(ActionTypes.ADD_COOLDOWN, { userId, command, lastCommandTime });
