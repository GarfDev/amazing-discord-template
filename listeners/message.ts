import { Message } from 'discord.js';
import { checkFromSelf, checkMessage } from '../utils/messages';

async function onMessage(message: Message) {
  // Return if message from itself
  const isFromSelf = checkFromSelf(message.author.id);
  if (isFromSelf) return;

  // Check if this is a command
  const isCommand = checkMessage(message.content);
  console.log(isCommand);
}

export default onMessage;
