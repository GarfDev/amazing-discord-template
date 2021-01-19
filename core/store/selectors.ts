import { createSelector } from 'reselect';
import { ApplicationRootState } from './types';

export const rootSelector = (state: ApplicationRootState) => state;

export const metadataSelector = createSelector(
  rootSelector,
  state => state.meta
);
