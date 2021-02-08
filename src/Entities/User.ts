import mongoose, { Schema } from "mongoose";
import Entity from "./Entity";
import IUser from "../Types/User";

import { configs } from "../Configs/configs";

const schema = new Schema<IUser>({
	...Entity,
	firstName: String,
});

const model = mongoose.model<IUser>(configs.mongo.documents.user, schema);

export default model;
