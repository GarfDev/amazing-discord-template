import path from 'path';
import appRootPath from 'app-root-path';

const getStaticPath = (continuePath: string): string =>
  path.join(appRootPath.path, continuePath);

export default getStaticPath;
