import { Router } from 'express';
import UserController from '../Controllers/UserController';

const routes = Router();

routes.get('/users-get-all', UserController.getAll);


export default routes;