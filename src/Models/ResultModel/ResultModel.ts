export default class ResultModel {
    constructor(m: any, valid: boolean, e?: string) {
        this.model = m;
        this.errorMessage = e;
        this.isValid = valid;
    }

    public model: any;
    public errorMessage: string;
    public isValid: boolean;
}