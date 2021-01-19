import path from 'path';

const fromRootPath = (continuePath: string): string =>
  path.join(require.main?.filename || '', '..', continuePath);

export default fromRootPath;
