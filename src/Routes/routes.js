import { Router } from 'express';
import passport from "passport";

import UserController from '../Controllers/UserController';
import { configs } from '../Configs/configs';

const routes = Router();

routes.get(configs.routes.user.getAll, passport.authenticate(["basic", "jwt"], { session: false }), UserController.getAll);
routes.get(configs.routes.user.getById, passport.authenticate(["basic", "jwt"], { session: false }), UserController.getById);

export default routes;