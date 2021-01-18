import path from 'path';
import Discord from 'discord.js';
import { listenersRegister } from 'utils';
import { initApplication } from '@actions';
import { useDispatch } from 'hooks';

// Handle Environment variable
import dotenv from 'dotenv';
dotenv.config();
const dispatch = useDispatch();

// Init Discord Client
const client = new Discord.Client({ partials: [`MESSAGE`, `REACTION`] });
dispatch(initApplication(client));

// Register Listeners
const listenerPath = path.join(__dirname, 'listeners');
listenersRegister(client, listenerPath);

client.login(process.env.TOKEN);
