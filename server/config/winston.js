const winston = require('winston')
const path = require('path');
const logPath = path.join(__dirname, '/../logs/app.log');

dateFormat = () => {
    return new Date(Date.now()).toUTCString()
}

const customLevels = {
    levels: {
      trace: 5,
      debug: 4,
      info: 3,
      warn: 2,
      error: 1,
      fatal: 0
    },
    colors: {
      trace: 'white',
      debug: 'green',
      info: 'green',
      warn: 'yellow',
      error: 'red',
      fatal: 'red'
    }
  };

var options = {
    file: {
      level: 'info',
      filename: `${logPath}`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
    },
    console: {
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

class LoggerService {
    constructor(route) {
        this.log_data = null
        this.route = route
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(options.console),
                new winston.transports.File(options.file)
            ],
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf((info) => {
                    let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
                    message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                    message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                    return message
                })
            ),
        });
        this.logger = logger;
    }
    setLogData(log_data) {
        this.log_data = log_data
    }
    async info(message) {
        this.logger.log('info', message);
    }
    async info(message, obj) {
        this.logger.log('info', message, {
            obj
        })
    }
    async warn(message) {
        this.logger.log('warn', message);
    }
    async warn(message, obj) {
        this.logger.log('warn', message, {
            obj
        })
    }
    async debug(message) {
        this.logger.log('debug', message);
    }
    async debug(message, obj) {
        this.logger.log('debug', message, {
            obj
        })
    }
    async error(message) {
        this.logger.log('error', message);
    }
    async error(message, obj) {
        this.logger.log('error', message, {
            obj
        })
    }
}
module.exports = LoggerService