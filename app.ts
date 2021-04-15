import dotenv from 'dotenv';
import getClient from 'core/client';
import { getStaticPath, listenersRegister } from './utils';
import 'module-alias/register';

const application = () => {
  dotenv.config();

  // Init Discord Client
  const client = getClient();

  // Register Event Listeners
  const listenerPath = getStaticPath('listeners');
  listenersRegister(client, listenerPath);

  // Login with Environment Token
  client.login(process.env.TOKEN);
};

export default application;
