import { Request, Response } from 'express';
import path from "path";

import ResultModel from "../../Models/ResultModel/ResultModel";
import { statusCode } from "../Commons/";
import logger from "../../Services/Log/LogErrorService";

export default class UserController {
    protected static classPath: string = path.basename(__filename);

    public static async getAll(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, `Starting get All.`);

        try {
            return statusCode(res, 200, new ResultModel({}));
        } catch(error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return statusCode(res, 200, new ResultModel(null, [{
                message: `Exception: ${String(error)}`
            }]));
        }
    }
}
