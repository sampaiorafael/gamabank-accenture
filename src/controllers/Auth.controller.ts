import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Users } from '../models/Users.model';
import JWTHandler from '../helpers/JWTHandler';

class Auth {

    public login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        let { reqUsername, password } = req.body;

        if (!reqUsername || !password)
            return res.status(400).send('Os campos necessários não estão preenchidos');

        const repository = getRepository(Users);
        let query;

        try {
            query = await repository.findOne({ username: reqUsername });
        } catch (err) {
            return res.status(400).send(err.message);
        };

        return res.status(200).send(query);

    };

};

export default new Auth();