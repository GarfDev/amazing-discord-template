import { createSelector } from 'reselect';
import { ApplicationRootState } from './types';

export const rootSelector = (state: ApplicationRootState) => state;

export const metadataSelector = createSelector(
  rootSelector,
  state => state.meta
);

export const ownerIdSelector = createSelector(
  metadataSelector,
  state => state.ownerId
);

export const commandMetaSelector = createSelector(
  metadataSelector,
  state => state.commands
);

export const selectCommandByName = (commandName: string) =>
  createSelector(commandMetaSelector, state => state[commandName]);

export const cooldownSelector = createSelector(
  rootSelector,
  state => state.cooldown
);

export const selectCooldownById = (userId: string) =>
  createSelector(cooldownSelector, state => state[userId]);
