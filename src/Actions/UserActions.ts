import IUser from "../Types/User";
import User from "../Entities/User";

export default class UserActions {
    public static async fetchAll(take: any, sort: any, desc: any, skip: any) : Promise<IUser[]> {
        const users = await User
            .find()
            .limit(+take)
            .skip(+skip)
            .sort({ [sort]: desc === "true" ? -1 : 1 })
            .select({ deleted: 0, __v: 0, historic: 0 })
            .exec();
        return users;
    }

    public static async fetchById(id): Promise<IUser> {
        const user = await User.findById(id);
        return user;
    }
}