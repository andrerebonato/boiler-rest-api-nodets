import { Document } from "mongoose";

export default interface Entity extends Document {
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: Boolean;
    createdBy?: string;
    updatedBy?: string;
}
