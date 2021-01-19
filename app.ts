import path from 'path';
import { listenersRegister } from 'utils';
import getClient from 'core/client';

// Handle Environment variable
import dotenv from 'dotenv';
dotenv.config();

// Init Discord Client
const client = getClient();

// Register Listeners
const listenerPath = path.join(__dirname, 'listeners');
listenersRegister(client, listenerPath);

// Login with Environment Token
client.login(process.env.TOKEN);
