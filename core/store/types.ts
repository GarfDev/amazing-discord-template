import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ApplicationActions = ActionType<typeof actions>;

export interface MetaData {
  defaultPrefix: string;
  ownerId: string;
}

export interface ApplicationRootState {
  meta: MetaData;
}
