import path from 'path';

const getStaticPath = (continuePath: string): string =>
  path.join(require.main?.filename || '', '..', continuePath);

export default getStaticPath;
