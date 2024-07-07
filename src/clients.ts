import { PrismaClient } from '@prisma/client';
import winston from 'winston';

import config from '@config';

export const prisma = new PrismaClient();

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      level: config.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
          const colorizer = winston.format.colorize();
          const metaStr = `[${timestamp}] ${level.toUpperCase()}`;
          const meta = colorizer.colorize(level, metaStr);
          return `${meta}: ${message}`;
        }),
      ),
    }),
    new winston.transports.File({
      level: 'error',
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint({ depth: 2 }),
      ),
      dirname: './logs',
      filename: `${new Date().toISOString().split('T')[0]}.log`,
      maxsize: 10_000_000,
      zippedArchive: true,
      lazy: true,
    }),
  ],
  silent: false,
  handleExceptions: false,
  handleRejections: false,
  exitOnError: false,
});
