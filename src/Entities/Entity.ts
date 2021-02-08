import { Schema } from "mongoose";
import { configs } from "../Configs/configs";

export default {
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: configs.mongo.documents.user
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: configs.mongo.documents.user
    }
};
