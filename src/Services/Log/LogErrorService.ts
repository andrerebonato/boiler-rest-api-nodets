import winston from 'winston';

export class LogErrorService {
    public static logger() {
        return winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { date: new Date() },
            transports: [
                new winston.transports.File({ filename: 'logs/formated-errors.log', level: 'error' }),
                new winston.transports.File({ filename: 'logs/all-errors.log' })
            ]
        });
    }
}