import { CommandHandler } from 'types';

interface Commands {
  [key: string]: CommandHandler;
}

export default Commands;
