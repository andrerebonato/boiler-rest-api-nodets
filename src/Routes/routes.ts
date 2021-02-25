import express from 'express';

import AuthJwtService from "../Services/Auth/AuthJwtService";
import UserController from '../Controllers/UserController';
import { configs } from '../Configs/configs';

import "moment/locale/pt-br";

const router = express.Router();

router.get(configs.routes.user.getAll, AuthJwtService.verifyToken, UserController.getAll);
router.get(configs.routes.user.getById, AuthJwtService.verifyToken, UserController.getById);
router.get(configs.routes.user.me, AuthJwtService.verifyToken, UserController.me);
router.post(configs.routes.user.create, AuthJwtService.verifyToken, UserController.create);
router.post(configs.routes.user.refreshToken, UserController.refreshToken);
router.post(configs.routes.user.authenticate, UserController.authenticate);

export default router;