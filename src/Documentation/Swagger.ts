import { API_VERSION } from "../Configs/configs";

export default class Swagger {

    public static options = {
        swaggerDefinition: {
            info: {
                title: "Boiler rest api made with express & node.",
                version: API_VERSION
            },
            apis: ["../Routes/routes.ts"]
        }
    };

    public static getSwaggerDocs() {
        
    }  

}