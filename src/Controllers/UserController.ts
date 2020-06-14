import ResponseType from './ResponseType';
import { Request, Response } from 'express';

export default class UserController {

    public static async getAll(req: Request, res: Response): Promise<any> {
        //adicionar logica de requisição do banco de dados aqui.
        return res.status(200).json(ResponseType.success('Carregado todos os usuários', []));
    }
}
