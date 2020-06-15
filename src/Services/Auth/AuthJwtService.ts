import jwt from 'jsonwebtoken';
import { configs } from '../../Configs/configs';

export class AuthJwtService {
    public static generateToken(userData: Object){
        const token: string = jwt.sign(userData, configs.authJwt.secretKey);
        if(token) {
            return token;
        } else {
            setInterval(() => {
                this.generateToken(userData);
            }, 1000);
        }
    }
    public static verifyToken(token: string){
        try{
            return jwt.verify(token, configs.authJwt.secretKey);
        }catch(e){
            console.log('Error at AuthJwtService_verifyToken, error: ',e);
            return null;
        }
    }

}