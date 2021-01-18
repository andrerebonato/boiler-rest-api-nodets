import { Response } from 'express';

export function statusCode(res: Response, statusCode: number, value: object): Response {
    return res.status(statusCode).json(value);
}