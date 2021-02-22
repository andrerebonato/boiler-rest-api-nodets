import mongoose, { Schema } from "mongoose";
import Entity from "./Entity";
import IUser from "../Types/User";

import UserDomain from "../Domain/UserDomain";
import { PasswordCryptService } from "../Services/Crypt/PasswordCryptService";
import { configs } from "../Configs/configs";

const schema = new Schema<IUser>({
	...Entity,
	username: {
		type: String,
		index: true,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	roles: {
		type: [String]
	},
	pushTokens: {
		type: [String]
	},
	firstName: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		default: 0
	},
	gender: {
		type: Number
	},
});

schema.methods.createUser = async function(newUser, callback) {
	const errors = UserDomain.validateData(newUser);

	if(Object.keys(errors)) {
		return callback(errors);
	}

	const hash = await PasswordCryptService.hash(newUser.password);
	newUser.password = hash;
	newUser.save(callback);
};

schema.methods.updateUser = async function(user, callback) {
	if (user.password) {
		const hash = await PasswordCryptService.hash(user.password);
		user.password = hash;
		user.save(callback);
	} else {
		user.save(callback);
	}
};

schema.methods.validPassword = async function(pwd, callback) {
	const result = await PasswordCryptService.compare(pwd, this.password);
	return callback(result);
};

const model = mongoose.model<IUser>(configs.mongo.documents.user, schema);

export default model;
