import rateLimit from "express-rate-limit";

export class RequestRateLimitService { 
    public static limiter(){
        const maximumRequestsPerMinute: number = 150;
        return rateLimit({
            windowMs: 60 * 1000,
            max: maximumRequestsPerMinute,
            message: "Too many requests, try again later."
        });
    }
}