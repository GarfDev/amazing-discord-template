import { Client } from 'discord.js';
import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const initApplication = (client: Client) =>
  action(ActionTypes.INIT_APPLICATION, { client });
