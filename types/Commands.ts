import { CommandListener } from 'types';

interface Commands {
  [key: string]: CommandListener;
}

export default Commands;
