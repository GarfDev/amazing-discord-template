import { runCommand } from '@actions';
import { useDispatch } from '@hooks';
import { Message } from 'discord.js';
import { checkFromSelf, checkMessage } from '../utils/messages';

async function onMessage(message: Message): Promise<void> {
  const dispatch = useDispatch();
  // Return if message from itself
  const isFromSelf = checkFromSelf(message.author.id);
  if (isFromSelf) return;

  // Check if this is a command
  const isCommand = checkMessage(message.content);
  if (!isCommand) return;

  // Dispatch command
  dispatch(runCommand(message));
}

export default onMessage;
