import bcrypt from 'bcrypt';
import { configs } from '../../Configs/configs';

export class PasswordCryptService {
    public static async hash(password: string): Promise<string> {
        try {
            const hashPassword: string = bcrypt.hashSync(password, configs.passwordCrypt.saltLevel);
            return hashPassword;
        } catch(err) {
            console.log("Error at PasswordCryptService_hash. Error: "+ err);
            throw new Error("Error at PasswordCryptService_hash. Check te console for morre informations.");
        }
    }

    public static async compare(password: string, hashPassword: string): Promise<Boolean> {
        try {
            const result: boolean = bcrypt.compareSync(password, hashPassword);
            return result;
        } catch(err) {
            console.log("Error at PasswordCryptService_compare. Error: "+ err);
            throw new Error("Error at PasswordCryptService_compare. Check te console for morre informations.");
        }
    }

}