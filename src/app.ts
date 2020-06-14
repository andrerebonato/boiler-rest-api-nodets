import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './Routes/routes';
import { configs } from './Configs/configs';
import morgan from 'morgan';

import { RequestRateLimitService } from './Services/SecurityMiddlewares/RequestRateLimitService';

class App {
    public express: express.Application;

    public constructor () {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(morgan(configs.morganMiddleware.type));
        this.express.use(RequestRateLimitService.limiter());
        this.express.use(RequestRateLimitService.slower());
    }

    private routes (): void{
        this.express.use(routes);
    }
}

export default new App().express;