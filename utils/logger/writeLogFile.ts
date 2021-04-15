import fs from 'fs';
import moment from 'moment';
import getLogger from './getLogger';
import getStaticPath from 'utils/getStaticPath';

const writeLogToFile = () => {
  const logger = getLogger();
  const logStaticPath = getStaticPath(
    `logs/${moment().format('DD-MM-YYYY')}.txt`
  );

  logger.records.forEach(log => {
    fs.writeFileSync(logStaticPath, log.message + '\n', { flag: 'a+' });
  });
};

export default writeLogToFile;
