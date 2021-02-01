import moment from 'moment';
import winston from 'winston';

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      level: 'info',
      filename: `logs/monition/${moment().format('DD-MM-YYYY')}.log`,
      format: winston.format.printf(
        info => `${[info.timestamp]} - ${info.message}`
      )
    }),
    new winston.transports.File({
      level: 'error',
      filename: `logs/errors/${moment().format('DD-MM-YYYY')}.log`,
      format: winston.format.printf(
        info => `${[info.timestamp]} - ${info.message}`
      )
    })
  ],
  //
  format: winston.format.combine(
    winston.format.timestamp({
      format: moment().format().trim()
    }),
    winston.format.printf(
      info => `${info.level} - ${[info.timestamp]} - ${info.message}`
    )
  )
};

const getLogger = (): (() => winston.Logger) => {
  const logger = winston.createLogger(logConfiguration);
  return () => logger;
};

export default getLogger();
