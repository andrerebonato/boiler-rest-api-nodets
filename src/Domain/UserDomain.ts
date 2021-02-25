import IUser from "../Types/User";

export default class UserDomain {

    public static validateData(user: IUser): any[] {
        const errors = [];

        if(!user.firstName) {
            errors.push({ firstName: "Este campo não pode ser vazio ou nulo." });
        } else if(user.firstName.length >= 30) {
            errors.push({ firstName: "Este campo não pode conter mais de 30 caracteres." });
        } else if(!user.email) {
            errors.push({ email: "Este campo não pode ser vazio ou nulo"});
        } else if(!user.password) {
            errors.push({ password: "Este campo não pode ser vazio ou nulo"});
        } else if(!user.username) {
            errors.push({ username: "Este campo não pode ser vazio ou nulo"});
        }

        return errors;
    }
}