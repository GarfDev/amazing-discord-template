import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const initApplication = () => action(ActionTypes.INIT_APPLICATION);
