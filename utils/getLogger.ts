import moment from 'moment';
import log from 'npmlog';

export default () => {
  return {
    info: (message: string) => {
      const now = moment().format('DD-MM-YYYY');
      log.info(now, message);
    },
    error: (message: string) => {
      const now = moment().format('DD-MM-YYYY');
      log.info(now, message);
    }
  };
};
