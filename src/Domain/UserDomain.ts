import IUser from "../Types/User";
export default class UserDomain {

    public static validate(user: IUser): any[] | void {
        const errors = [];
        const mongooseErrors = user.validateSync();

        if (mongooseErrors) {
            const messages = mongooseErrors.message.split(',');
            messages.map(m => errors.push({ message: m }));
            return errors;
        }

        return null;
    }
}