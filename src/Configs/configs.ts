const API_VERSION = "/api/v1";

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
    passwordCrypt: {
        /* salt is the number that provides the level of security and the time to hash the crypt [0 to 10]. */
        saltLevel: 10
    },
    routes: {
        user: {
            getAll: `${API_VERSION}/user/get-all`
        }
    }
}