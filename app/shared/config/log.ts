import winston, { LoggerOptions } from "winston";

const config: {
  [env: string]: LoggerOptions;
} = {
  test: {
    format: winston.format.simple(),
    transports: [
      (function () {
        const c = new winston.transports.Console();
        c.silent = true;
        return c;
      })(),
    ],
  },
  dev: {
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  },
  production: {
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    transports: [
      (() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const loggingFile = `spins_service_log_${year}_${month}.json`;
        return new winston.transports.File({
          filename: loggingFile,
          level: "error",
        });
      })(),

      (() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const loggingFile = `spins_service_log_${year}_${month}.json`;
        return new winston.transports.File({
          filename: loggingFile,
          level: "warn",
        });
      })(),
    ],
  },
};

const logger = winston.createLogger(
  config[process.env.NODE_ENV as string]
    ? config[process.env.NODE_ENV as string]
    : config.other
);

export default logger;
