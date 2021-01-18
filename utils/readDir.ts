import fs from 'fs';

/**
 *
 * @param path Directory that need to read
 * @returns Name of all files in that directory
 */
function readDir(path: string): string[] {
  const fileNames: string[] = fs.readdirSync(path);

  return fileNames;
}

export default readDir;
