import path from 'path';
import { Client } from 'discord.js';
import { getFileNames, getModules, readDir } from 'utils';

function listenersRegister(client: Client, listenersPath: string): void {
  const fileList = readDir(listenersPath);
  const fileNames = getFileNames(fileList);
  const eventHandlers = readDir(listenersPath).map(file => {
    const filePath = path.join(listenersPath, file);
    return getModules(filePath).default;
  });

  fileNames.forEach((name, index) => {
    client.on(name, eventHandlers[index]);
  });
}

export default listenersRegister;
