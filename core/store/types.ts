import CommandListenerMeta from 'types/CommandListenerMeta';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ApplicationActions = ActionType<typeof actions>;

export interface CommandMeta {
  [key: string]: CommandListenerMeta;
}

export interface UserCooldownState {
  [command: string]: number;
}

export interface CooldownState {
  [userId: string]: UserCooldownState;
}

export interface CommandMetaState {
  [key: string]: CommandMeta;
}

export interface MetaDataState {
  commands: CommandMetaState;
  defaultPrefix: string;
  ownerId: string;
}

export interface ApplicationRootState {
  meta: MetaDataState;
  cooldown: CooldownState;
}
