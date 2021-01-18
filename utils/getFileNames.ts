const getFileNames = (file: string[]): string[] =>
  file.map(name => name.split('.')[0]);

export default getFileNames;
