import IError from "../Types/Error";

export default class ResultModel {
    constructor(m: any, errors?: IError[]) {
        this.result = errors ? {} : m;
        this.errors = errors;
        this.isValid = !errors;
    }

    public result: any;
    public errors: IError[];
    public isValid: boolean;
}