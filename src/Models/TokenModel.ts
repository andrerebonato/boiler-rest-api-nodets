export default class TokenModel {
	constructor(token: string, expiration: Date) {
		this.token = token;
		this.expiration = expiration;
	}

	token: string;
	expiration: Date;
}
