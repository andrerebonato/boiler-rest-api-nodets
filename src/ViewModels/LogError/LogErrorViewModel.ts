export class LogErrorViewModel {
    public message: string;
    public statusCode: number;
    public data?: any;
    public date: Date;

    constructor(message: string, statusCode: number, data?: any){
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.date = new Date();
    }

}