import dotenv from 'dotenv';
import getClient from 'core/client';
import { getStaticPath, listenersRegister } from './utils';
import 'module-alias/register';

const application = async () => {
  dotenv.config();

  // Init Discord Client
  const client = getClient();

  // Register Event Listeners
  const listenerPath = getStaticPath('listeners');
  listenersRegister(client, listenerPath);

  // Login with Environment Token
  await client.login(process.env.TOKEN);
  return client;
};

export default application;
