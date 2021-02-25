import { Request, Response } from 'express';
import path from "path";
import jwt from "jsonwebtoken";
import moment from "moment";

import IUser from "../Types/User";
import TokenModel from "../Models/TokenModel";
import { configs } from "../Configs/configs";
import ResultModel from "../Models/ResultModel";
import logger from "../Services/Log/LogErrorService";
import AuthJwtService from "../Services/Auth/AuthJwtService";
import UserActions from "../Actions/UserActions";
export default class UserController {
    protected static classPath: string = path.basename(__filename);

    public static async getAll(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting get All.");
        try {
            const { skip, take, sort, desc } = req.query;
            const users = await UserActions.fetchAll(take, sort, desc, skip);
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

    public static async me(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting refreshToken.");
        try {
            const user = await UserActions.fetchById(req.user);

            if (!user) {
				res
					.status(404)
					.json(new ResultModel(null, [{ message: "not found" }]));
            }

            return res.status(200).json(new ResultModel(user));

        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        }
    }

    public static async create(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting create.");

        try {
            const user = await UserActions.create(req.body);
            user.createUser(user, (err) => {
                if (err) {
                    return res.status(403).json(new ResultModel(null, err));
                }
                return res.status(200).json(new ResultModel(user));
            });
        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        } 
    }

    public static async authenticate(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting authenticate.");

        try {
            const { username, password } = req.body;

            const user = await UserActions.findByCredentials(username, password);

            if (!user) {
                return res.status(400).json(new ResultModel(null, [{ message: "Credenciais inválidas "}]));
            }
            
            const token = AuthJwtService.generateToken(user);
        
            return res.json(
				new ResultModel(
                    new TokenModel(
                        token,
                        moment
                            .utc()
                            .add(1, "minute")
                            .toDate()
                    )
                )
			);

        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        }
    }

    public static async refreshToken(req: Request, res: Response): Promise<any> {
        logger.dispatch(UserController.classPath, logger.types.info, "Starting refreshToken.");

        try {
            let token = req.query.token;
		    const userId = req.query.userId;

            const user = await UserActions.fetchById(userId);

            const decoded = jwt.verify(String(token), configs.authJwt.secretKey, {
                ignoreExpiration: true
            }) as IUser;

            if (user._id.toString() !== decoded) {
                return res
                    .status(400)
                    .json(new ResultModel(null, [{ message:"Inválid token" }]));
            }

            token = jwt.sign(user.toJSON(), configs.authJwt.secretKey, { expiresIn: "1d" });

            return res.json(
				new ResultModel(
					new TokenModel(
						String(token),
						moment
							.utc()
							.add(1, "day")
							.toDate()
					)
				)
			);

        } catch (error) {
            logger.dispatch(UserController.classPath, logger.types.error, `Exception: ${String(error)}`);
            return res.status(500).json(new ResultModel(null));
        }
    }
}
