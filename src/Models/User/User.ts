import { BaseModel } from '../BaseModel/BaseModel';

export class User extends BaseModel {
    public firstName: String;
    public lastName: String;
    public email: String;
    public password: String;
}