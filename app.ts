import dotenv from 'dotenv';
import getClient from 'core/client';
import { fromRootPath, listenersRegister } from './utils';

const main = () => {
  dotenv.config();

  // Init Discord Client
  const client = getClient();

  // Register Event Listeners
  const listenerPath = fromRootPath('listeners');
  listenersRegister(client, listenerPath);

  // Login with Environment Token
  client.login(process.env.TOKEN);
};

// Run application
main();
