import { CommandHandler } from 'types';

interface Commands {
  [key: string]: Commands | CommandHandler;
}

export default Commands;
