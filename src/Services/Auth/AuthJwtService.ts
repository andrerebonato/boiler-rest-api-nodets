import jwt from 'jsonwebtoken';
import path from "path";

import logger from "../Log/LogErrorService";
import { configs } from '../../Configs/configs';

export class AuthJwtService {
    public static classPath: string = path.basename(__filename);

    public static generateToken(userData: Object){
        try {
            logger.dispatch(AuthJwtService.classPath, logger.types.info, "Started generateToken");
            const token: string = jwt.sign(userData, configs.authJwt.secretKey);
            if(token) {
                return token;
            } else {
                setInterval(() => {
                    this.generateToken(userData);
                }, 1000);
            }
        } catch (err) {
            logger.dispatch(AuthJwtService.classPath, logger.types.error, `Exception: ${String(err)}`);
            throw err;
        }
    }
    public static verifyToken(token: string){
        try{
            logger.dispatch(AuthJwtService.classPath, logger.types.info, "Started verifyToken.");
            return jwt.verify(token, configs.authJwt.secretKey);
        }catch(err){
            logger.dispatch(AuthJwtService.classPath, logger.types.error, `Exception: ${String(err)}`);
            throw err;
        }
    }

}