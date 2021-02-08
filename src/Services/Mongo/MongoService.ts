import mongoose from "mongoose";
import path from "path";

import { configs } from "../../Configs/configs";
import logger from "../../Services/Log/LogErrorService";

export default class MongoService {
    protected static classPath: string = path.basename(__filename);

    public static setup() {
        //require("../../Entities/User");
        mongoose.set("useCreateIndex", true);
        const db = mongoose.connection;

        db.on("connecting", function() {
            logger.dispatch(MongoService.classPath, logger.types.info, "connecting to MongoDB...");
        });
        
        db.on("error", function(error) {
            logger.dispatch(MongoService.classPath, logger.types.error, "Error in MongoDb connection: " + error);
            mongoose.disconnect();
        });

        db.on("connected", function() {
            logger.dispatch(MongoService.classPath, logger.types.info, "MongoDB connected!");
        });
        
        db.once("open", function() {
            logger.dispatch(MongoService.classPath, logger.types.info, "MongoDB connection opened!");
        });

        db.on("reconnected", function() {
            logger.dispatch(MongoService.classPath, logger.types.info, "MongoDB reconnected!");
        });

        db.on("disconnected", function() {
            logger.dispatch(MongoService.classPath, logger.types.info, "MongoDB disconnected!");
            mongoose.connect(configs.mongo.uri, configs.mongo.options);
        });
        
        mongoose.connect(configs.mongo.uri, configs.mongo.options);
        require("../../Entities/User");
    }
}