export class HttpGetCommonResponseViewModel {
    public success: Boolean;
    public message: String;
    public data: any;
    public dataLength?: number;

    constructor(success: Boolean, message: String, data: any, dataLength?: number) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.dataLength = dataLength;
    }

}