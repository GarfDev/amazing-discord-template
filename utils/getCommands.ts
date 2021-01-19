import path from 'path';
import { Commands } from 'types';
import { getFileNames, getModules, readDir } from 'utils';

function getCommands(listenersPath: string): Commands {
  const commandObj: Commands = {};

  const fileList = readDir(listenersPath);
  const fileNames = getFileNames(fileList);
  const eventHandlers = readDir(listenersPath).map(file => {
    const filePath = path.join(listenersPath, file);
    return getModules(filePath).default;
  });

  fileNames.forEach((name, index) => {
    commandObj[name] = eventHandlers[index];
  });

  return commandObj;
}

export default getCommands;
