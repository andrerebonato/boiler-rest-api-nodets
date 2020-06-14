import bcrypt from 'bcrypt';

export class PasswordCryptService {
    /* salt is the number that provides the level of security and the time to hash the crypt [0 to 10]. */
    public static salt: number = 10;

    public static async hash(password: string): Promise<string> {
        try {
            const hashPassword = bcrypt.hashSync(password, this.salt);
            return hashPassword;
        } catch(err) {
            console.log("Error at PasswordCryptService_hash. Error: "+ err);
            throw new Error("Error at PasswordCryptService_hash. Check te console for morre informations.");
        }
    }

    public static async compare(password: string, hashPassword: string): Promise<Boolean> {
        try {
            const result = bcrypt.compareSync(password, hashPassword);
            return result;
        } catch(err) {
            console.log("Error at PasswordCryptService_compare. Error: "+ err);
            throw new Error("Error at PasswordCryptService_compare. Check te console for morre informations.");
        }
    }

}