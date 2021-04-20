import IUser from "../Types/User";
import User from "../Entities/User";
import { PasswordCryptService } from "../Services/Crypt/PasswordCryptService";
import { configs } from "../Configs/configs";
export default class UserActions {
    public static async fetchAll(take: any, sort: any, desc: any, skip: any) : Promise<IUser[]> {
        return await User
            .find({ deleted: false })
            .limit(+take)
            .skip(+skip)
            .sort({ [sort]: desc === "true" ? -1 : 1 })
            .exec();
    }

    public static async fetchById(id): Promise<IUser> {
        return await User.findOne({ _id: id, deleted: false }).select({ deleted: 0, __v: 0, historic: 0, password: 0 });
    }

    public static async create(u: IUser): Promise<IUser> {
        return new User({ ...u });
    }

    public static async findByCredentials(username: string, password: string): Promise<any> {
        const user = await User.findOne({ username: username });
        
        if (user) {
            const correctPassword = await PasswordCryptService.compare(password, user.password);

            if (correctPassword) {
                user.password = null;
                return user;
            } 
            return null;
        }
        
        return null;
    }

    public static async findByIdAndDelete(uid: string, emitent: IUser): Promise<void> {
        await User.updateOne(
            {
                _id: uid
            },
            {
                deleted: true, deletedBy: emitent._id 
            }
        )
    }

    public static async findByIdAndUpdate(id: string, model: IUser): Promise<void> {
        User.findByIdAndUpdate(
            id,
            model,
            { new: true },
            (err, model) => {
                if (err) {
                    return false;
                } else {
                    return model;
                }
            }
        )
    }

    public static async findByProp(prop: string, value: any): Promise<IUser> {
        return await User.findOne({ [prop]: value, disabled: false });
    }

}