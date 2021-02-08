import IUser from "../Types/User";

export default class UserDomain {

    protected static validateData(user: IUser): any[] {
        const errors = [];

        if(!user.firstName) {
            let error = { firstName: "Este campo não pode ser vazio ou nulo." };
            errors.push(error);
        } else if(user.firstName.length >= 30) {
            let error = { firstName: "Este campo não pode conter mais de 30 caracteres." };
            errors.push(error);
        }

        return errors;
    }
}