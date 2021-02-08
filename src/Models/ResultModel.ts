import IError from "../Interfaces/Error";

export default class ResultModel {
    constructor(m: any, errors?: IError[]) {
        this.model = m;
        this.errors = errors;
        this.isValid = !errors;
    }

    public model: any;
    public errors: IError[];
    public isValid: boolean;
}