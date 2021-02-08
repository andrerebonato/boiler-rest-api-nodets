import { Request, Response } from 'express';
import path from "path";

import ResultModel from "../Models/ResultModel";
import logger from "../Services/Log/LogErrorService";
import UserActions from "../Actions/UserActions";

export default class UserController {
    protected static classPath: string = path.basename(__filename);

    public static async getAll(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting get All.");
        try {
            const users = await UserActions.fetchAll();
            return res.status(200).json(new ResultModel(users));
        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        }
    }

    public static async getById(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting get by id.");
        try {
            const { id } = req.params;

            if(!id) return res.status(400).json(new ResultModel(null, [{ message: "User id is null." }]));

            const user = await UserActions.fetchById(id);

            if(!user) return res.status(404).json(new ResultModel(null, [{ message: "Theres no user with the given id." }]));

            return res.status(200).json(new ResultModel(user));
        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        }
    }
}
