import mongoose from "mongoose";
import path from "path";

import User from "../../Entities/User";
import { configs } from "../../Configs/configs";
import logger from "../../Services/Log/LogErrorService";

export default class MongoService {
    protected static classPath: string = path.basename(__filename);

    public static setup() {
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

        User.findOne({
            username: configs.admin.defaultAdmin
        }).then(async user => {
            if (!user) {
                user = new User({
                    firstName: "Administrador",
                    lastname: "BoilerPlate",
                    email: configs.admin.defaultAdmin,
                    username: configs.admin.defaultAdmin,
                    password: configs.admin.defaultPass,
                    roles: ["admin"],
                    userStatus: 1
                });

                await user.createUser(user, function(err, user) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
}