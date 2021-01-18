import { createSelector } from 'reselect';
import { ApplicationRootState } from './types';

export const rootSelector = (state: ApplicationRootState) => state;

export const clientSelector = createSelector(
  rootSelector,
  state => state.client
);
