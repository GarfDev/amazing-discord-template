import getPrefix from './getPrefix';

const isCommand = (message: string): boolean => {
  const prefix = getPrefix();

  return message.startsWith(prefix);
};

export default isCommand;
