import path from 'path';
import { Commands } from 'types';
import { getModules, readDir } from 'utils';

function getCommands(): (commandPath: string) => Commands {
  let isLoaded = false;
  const commandObj: Commands = {};

  return (commandPath: string) => {
    /* Directly return if already load modules */
    if (isLoaded) return commandObj;
    readDir(commandPath).map(file => {
      const filePath = path.join(commandPath, file);
      const module = getModules(filePath).default;
      commandObj[file] = module;
      return module;
    });

    isLoaded = true;
    return commandObj;
  };
}

export default getCommands();
