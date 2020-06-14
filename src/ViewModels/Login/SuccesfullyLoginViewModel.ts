export class SuccesfullyLoginViewModel {
    public success: Boolean;
    public message: String;
    public token: String;
    public data: any;

    constructor(message: String, token: String, data: any){
        this.success = true;
        this.message = message;
        this.token = token;
        this.data = data;
    }

}