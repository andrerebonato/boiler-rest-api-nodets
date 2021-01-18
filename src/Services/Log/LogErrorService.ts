import winston from 'winston';
import moment from "moment";

moment.locale("pt-br");
const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: { date: moment().format('LLLL') },
    transports: [
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/infos.log', level: 'info' })
    ]
});

const types = {
    info: "info",
    error: "error"
}

const dispatch = (path: string, type: string, message: string) => {
    const completeMessage = `[${path}] - ${message}`.toLowerCase();
    
    console.info({
        type: "LOGGER-WATCHER",
        message: completeMessage,
        date: moment().format('LLLL')
    });

    if(type == types.info) {
        logger.info(completeMessage);
    }
    else { 
        logger.error(completeMessage);
    }
}

export default {
    dispatch,
    types
};