import * as settings from '../settings.json';
// tslint:disable-next-line:no-var-requires
const winston = require('winston');
const defaultLevel = process.env.LOG_LEVEL || settings.loglevel;

export const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  level: defaultLevel,
  transports: [
    new winston.transports.File({
      filename: settings.logfile,
      maxsize: 4096
    }),
    process.env.NODE_ENV !== 'production' && new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
