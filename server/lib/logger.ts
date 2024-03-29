import { createLogger, format, transports } from 'winston';

// console
// file transport
// timestamp

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'info' : 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/quick-start-combined.log' }),
  ],
});

export default logger;
