export const API_VERSION = "/api/v1";

export const configs = {
    requests: {
        limiter: {
            rateLimitWindow: 60 * 1000,
            maxRequestsPerRateLimitWindow: 150,
        },
        slower: {
            rateLimitWindow: 60 * 1000,
            delayAfterPerRateLimitWindow: 100,
            delayMs: 250
        }
    },
    authJwt: {
        secretKey: "KEY_VAI_AQUI"
    },
    morganMiddleware: {
        type: "common"
    },
    passwordCrypt: {
        /* salt is the number that provides the level of security and the time to hash the crypt [0 to 10]. */
        saltLevel: 10
    },
    mongo: {
        options: {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        },
        uri: "mongodb://localhost:27017/bankName",
        documents: {
            user: "users",
        },
    },
    routes: {
        user: {
            getAll: `${API_VERSION}/user/get-all`,
            getById: `${API_VERSION}/user/:id`,
            create: `${API_VERSION}/user/create`,
            authenticate: `${API_VERSION}/user/authenticate`,
            refreshToken: `${API_VERSION}/token/refresh`,
            me: `${API_VERSION}/me`,
        },
        swagger: {
            index: `${API_VERSION}/docs`
        }
    },
    admin: {
        defaultAdmin: "admin@admin.com",
        defaultPass: "admin"
    }
}