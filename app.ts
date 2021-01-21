import dotenv from 'dotenv';

import getClient from 'core/client';
import { fromRootPath, listenersRegister } from './utils';

dotenv.config();

// Init Discord Client
const client = getClient();

// Register Event Listeners
const listenerPath = fromRootPath('listeners');
listenersRegister(client, listenerPath);

// Login with Environment Token
client.login(process.env.TOKEN);
