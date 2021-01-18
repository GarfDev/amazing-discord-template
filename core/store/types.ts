import { Client } from 'discord.js';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ApplicationActions = ActionType<typeof actions>;

export interface ApplicationRootState {
  client?: Client;
}
