import { Client } from 'discord.js';

function createClient() {
  const client = new Client({ partials: [`MESSAGE`, `REACTION`] });

  return () => client;
}

export default createClient();
export { default as sendMessage } from './sendMessage';
