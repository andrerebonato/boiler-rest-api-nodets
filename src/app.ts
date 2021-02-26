import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import helmet from 'helmet';
import routes from './Routes/routes';
import expressValidator from "express-validator";
import { configs } from './Configs/configs';
import bodyParser from "body-parser";
import compression from "compression";
import morgan from 'morgan';
import logger from "./Services/Log/LogErrorService";
import path from "path";
//import Swagger from "./Documentation/Swagger";
import MongoService from "./Services/Mongo/MongoService";
import { RequestRateLimitService } from './Services/SecurityMiddlewares/RequestRateLimitService';
class App {
    protected static classPath: string = path.basename(__filename);
    public express: express.Application;

    public constructor () {
        this.services();
        this.express = express();
        //this.express.use(configs.routes.swagger.index, swaggerUi.setup(swaggerJsdoc(Swagger.options)));
        this.middlewares();
        this.routes();
    }

    private async services() {
        MongoService.setup();
    }

    private middlewares() {
        try {
            logger.dispatch(App.classPath, logger.types.info, `Configuring middlewares...`);
            this.express.use(cors());
            this.express.use(compression());
            this.express.use(helmet());
            this.express.use(morgan(configs.morganMiddleware.type));
            this.express.use(RequestRateLimitService.limiter());
            this.express.use(RequestRateLimitService.slower());
            this.express.use(bodyParser.json());
            this.express.use(bodyParser.urlencoded({ extended: false }));
            this.express.use(expressValidator());
            this.express.set("port", 3334);
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