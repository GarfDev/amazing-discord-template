import Discord from 'discord.js';
import { dispatch } from 'utils';
import { initApplication } from '@actions';

// Handle Environment variable
import dotenv from 'dotenv';
dotenv.config();

// Init Discord Client
const client = new Discord.Client({ partials: [`MESSAGE`, `REACTION`] });

client.once('ready', async () => {
  dispatch(initApplication());
});

client.login(process.env.TOKEN);
