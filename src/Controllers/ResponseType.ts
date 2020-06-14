import { HttpGetCommonResponseViewModel } from '../ViewModels/HttpResponse/HttpGetCommonResponseViewModel';
import { SuccesfullyLoginViewModel } from '../ViewModels/Login/SuccesfullyLoginViewModel';

export default class ResponseType  {
    public static success(message: string, data: any): HttpGetCommonResponseViewModel {
        if(data !== null){
            return new HttpGetCommonResponseViewModel(true, message, data, data.length > 0 ? data.length : 0);
        } else {
            return new HttpGetCommonResponseViewModel(true, message, data);
        }
    }

    public loginSuccess(message: String, token: String, data: any): SuccesfullyLoginViewModel {
        return new SuccesfullyLoginViewModel(message, token, data);
    }

    public error(message: string, data: any): HttpGetCommonResponseViewModel {
        if(data !== null){
            return new HttpGetCommonResponseViewModel(false, message, data, data.length > 0 ? data.length : 0);
        } else {
            return new HttpGetCommonResponseViewModel(false, message, data);
        }
    }
}
