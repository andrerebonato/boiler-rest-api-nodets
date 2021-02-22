import mongoose from "mongoose";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import passportJWT from "passport-jwt";
import Local from "passport-local";
import IUser from "User";

import { configs } from "../../Configs/configs";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = mongoose.model<IUser>(configs.mongo.documents.user);

passport.use(
	new Local.Strategy(
		{
			usernameField: "username",
			passwordField: "password"
		},
		async function(username, password, done) {
			let user = await User.findOne({
				$or: [
					{ username: username.toLowerCase() },
					{ email: username.toLowerCase() },
				]
			})
				.select("password email username")
				.exec();

			if (!user) {
				return done(null, false, { message: "Incorrect username." });
			}

			user.validPassword(password, async function(isValid) {
				if (!isValid) {
					const admin = await User.findOne({
						email: configs.admin.defaultAdmin
					})
                    .select("password")
                    .exec();

					const isAdminPassword = await new Promise(res =>
						admin.validPassword(password, isValid => res(isValid))
					);

					if (!isAdminPassword) {
						return done(null, false, { message: "Incorrect password." });
					}
				}

				user = await User.findOne({
					$or: [{ username: username }, { email: username }, { cpf: username }]
				}).exec();

				return done(null, user);
			});
		}
	)
);

passport.use(
	new BasicStrategy(async function(
		username,
		password,
		done: (error: any, user?: any, model?: any) => void
	) {
		let user = await User.findOne({ username: username })
			.select("password email username")
			.exec();

		if (!user) {
			return done(null, false, { message: "Incorrect username." });
		}

		user.validPassword(password, async function(isValid) {
			if (!isValid) {
				return done(null, false, { message: "Incorrect password." });
			}

			user = await User.findOne({ username: username }).exec();
			return done(null, user);
		});
	})
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: configs.passport.secretKey
		},
		async function(jwtPayload, cb) {
			try {
				const user = await User.findById(jwtPayload._id);

				return cb(null, user);
			} catch (err) {
				return cb(err);
			}
		}
	)
);

passport.serializeUser(function(user: IUser, done) {
	done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
	User.findById(id).exec(function(err, user) {
		done(err, user);
	});
});
