import jwt from 'jsonwebtoken';
import path from "path";

import IUser from "../../Types/User";
import logger from "../Log/LogErrorService";
import { configs } from '../../Configs/configs';

export default class AuthJwtService {
    public static classPath: string = path.basename(__filename);

    public static generateToken(userData: IUser){
        try {
            logger.dispatch(AuthJwtService.classPath, logger.types.info, "Started generateToken");
            const token: string = jwt.sign(String(userData._id), configs.authJwt.secretKey);
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

    public static verifyToken(req, res, next){
        try{
            logger.dispatch(AuthJwtService.classPath, logger.types.info, "Started verifyToken.");
            const token = req.headers.authorization?.trim().split("Bearer")[1].replace(" ", "");
            jwt.verify(token, configs.authJwt.secretKey, function (err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
                }
                req.user = decoded; 
                console.log("User Id: " + decoded)
                next();
            });
            
        }catch(err){
            logger.dispatch(AuthJwtService.classPath, logger.types.error, `Exception: ${String(err)}`);
            throw err;
        }
    }

}