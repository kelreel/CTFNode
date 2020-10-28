import winston, { format, transports } from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "CTFNode" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({
      filename: "./log/errors.log",
      level: "error",
      maxsize: 1000000,
      maxFiles: 10,
    }),
    new transports.File({
      level: "info",
      filename: "./log/common.log",
      maxsize: 1000000,
      maxFiles: 10,
    }),
    new transports.File({
      filename: "./log/http.log",
      maxsize: 1000000,
      maxFiles: 10,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: 'http',
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export const stream = {
  write: (message: any) => {
    logger.http(message)
  },
};