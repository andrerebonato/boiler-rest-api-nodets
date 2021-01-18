import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './Routes/routes';
import { configs } from './Configs/configs';
import morgan from 'morgan';
import logger from "./Services/Log/LogErrorService";
import path from "path";

import { RequestRateLimitService } from './Services/SecurityMiddlewares/RequestRateLimitService';
class App {
    protected static classPath: string = path.basename(__filename);
    public express: express.Application;

    public constructor () {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        try {
            logger.dispatch(App.classPath, logger.types.info, `Configuring middlewares...`);
            this.express.use(express.json());
            this.express.use(cors());
            this.express.use(helmet());
            this.express.use(morgan(configs.morganMiddleware.type));
            this.express.use(RequestRateLimitService.limiter());
            this.express.use(RequestRateLimitService.slower());
            logger.dispatch(App.classPath, logger.types.info, `Middlewares setup.`);
        } catch (err) {
            logger.dispatch(App.classPath, logger.types.error, `Exception: ${String(err)}`);
        }
    }

    private routes (): void{
        logger.dispatch(App.classPath, logger.types.info, `Configuring routes...`);
        try {
            this.express.use(routes);
            logger.dispatch(App.classPath, logger.types.info, `Routes setup...`);
        } catch (err) {
            logger.dispatch(App.classPath, logger.types.error, `Exception: ${String(err)}`);
        }
    }
}

export default new App().express;