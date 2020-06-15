import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { configs } from '../../Configs/configs';

export class RequestRateLimitService { 
    public static limiter(): any{
        return rateLimit({
            windowMs: configs.requests.limiter.rateLimitWindow,
            max: configs.requests.limiter.maxRequestsPerRateLimitWindow,
            message: "Too many requests, try again later."
        });
    }

    public static slower(): any{
        return slowDown({
            windowMs: configs.requests.slower.rateLimitWindow,
            delayAfter: configs.requests.slower.delayAfterPerRateLimitWindow,
            delayMs: configs.requests.slower.delayMs 
        });
    }
}