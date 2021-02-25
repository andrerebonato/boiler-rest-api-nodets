import Entity from "./Entity";

export default interface IUser extends Entity {
    username: string;
    email: string,
    password: string,
    roles?: string[],
    pushTokens?: string[],
    firstName: string,
    lastname: string,
    cpf: string,
    phoneNumber: string,
    birthDate: Date,
    gender?: Gender,
    status?: UserStatus,
    createUser: (u: IUser, callback: (err: any, product: IUser) => void) => Promise<void>;
	updateUser: (
		user: IUser,
		callback: (err: any, product: IUser) => void
	) => void;
	validPassword: (pwd: string, callback: (b: boolean) => void) => void;
}

export enum UserStatus {
	Disabled = 0,
	Enabled = 1
}

export enum Gender {
	male = 0,
	female = 1,
	other = 2
}
