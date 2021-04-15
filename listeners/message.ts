import { verifyCommand } from '@actions';
import { useDispatch } from 'utils/hooks';
import { Message } from 'discord.js';
import { checkFromSelf, checkMessage } from '../utils/messages';

async function onMessage(message: Message): Promise<void> {
  const dispatch = useDispatch();
  // Return if message from itself
  const isFromSelf = checkFromSelf(message.author.id);
  if (isFromSelf) return;

  // Return if is a bot message
  const isFromBot = message.author.bot;
  if (isFromBot) return;

  // Check if this is a command
  const isCommand = checkMessage(message.content);
  if (!isCommand) return;

  // Dispatch command
  dispatch(verifyCommand(message));
}

export default onMessage;
