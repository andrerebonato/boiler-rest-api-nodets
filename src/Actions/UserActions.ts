import IUser from "../Types/User";
import User from "../Entities/User";

export default class UserActions {
    public static async fetchAll() : Promise<IUser[]> {
        const users = await User.find().select({ deleted: 0 }).exec();
        return users;
    }

    public static async fetchById(id): Promise<IUser> {
        const user = await User.findById(id);
        return user;
    }
}