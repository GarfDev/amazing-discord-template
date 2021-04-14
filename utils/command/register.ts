import path from 'path';
import glob from 'glob';
import { compose } from 'redux';
import { CommandHandler, Commands } from 'types';
import { getStaticPath, getModules } from '..';
import { CommandListenerNotFound } from 'errors';

/**
 *
 * UTILS FUNCTIONS
 *
 */

/**
 *
 * @param path
 * This function return path without it root folder.
 *
 * Example: 'commands/foo/bar' -> 'foo/bar'
 *
 */
const removeSubPath = (subPath: string | RegExp) => (path: string) =>
  path.replace(subPath, '');

const commandFolder = 'commands';

/**
 *
 * MAIN RETURN FUNCTION
 *
 */

const commandListenerRegister = () => {
  let initialized = false;
  let cachedCommandObj: Commands = {};

  return () =>
    new Promise<Commands>(resolve => {
      if (initialized) {
        resolve(cachedCommandObj);
      }

      glob(`${commandFolder}/**/index.ts`, {}, function (er, files) {
        // Constants
        const commandObj: Commands = {};
        const commandFolderRemover = removeSubPath(`${commandFolder}/`);
        const removeTailSlash = (path: string) =>
          path.substring(0, path.lastIndexOf('/'));

        // Extract Useable Paths from String
        const commandPaths = files.map(
          compose(commandFolderRemover, removeTailSlash)
        );
        const spitedCommandPaths = commandPaths.map(path => path.split('/'));

        // Register Paths to an Object
        spitedCommandPaths.forEach(pathArray => {
          let currentDepth = commandObj;

          pathArray.reduce((pre, item) => {
            if (currentDepth[item] === undefined) {
              currentDepth[item] = {};
            }

            const filePath = path.join(
              getStaticPath(commandFolder),
              ...[...pre, item]
            );
            const module: CommandHandler = getModules(filePath).default;

            if (!module) throw new CommandListenerNotFound(filePath);

            currentDepth = currentDepth[item] as any;
            currentDepth.default = module;
            return [...pre, item];
          }, [] as string[]);
        });
        initialized = true;
        cachedCommandObj = commandObj;
        resolve(commandObj);
      });
    });
};

// Call this first to make a closure
export default commandListenerRegister();
