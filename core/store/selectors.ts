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
