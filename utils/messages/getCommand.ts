import getPrefix from './getPrefix';

const getCommand = (command: string): string =>
  command.replace(getPrefix(), '');

export default getCommand;
