import moment from 'moment';
import log from 'npmlog';
import writeLogToFile from './writeLogFile';

export default () => {
  return {
    info: (message: string) => {
      const now = moment().format('DD-MM-YYYY');
      log.info(now, message);
      writeLogToFile();
    },
    error: (message: string) => {
      const now = moment().format('DD-MM-YYYY');
      log.info(now, message);
      writeLogToFile();
    },
    records: log.record
  };
};
