import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Users } from '../models/Users.model';

class UsersController {

    public create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const repository = getRepository(Users);

        let { username, password, email, name, cpf } = req.body;
        let query;

        if (!username || !password || !email || !name || !cpf) 
            return res.status(400).send('Estão faltando campos');
        
        try {
            query = await repository.save({username, password, email, name, cpf});
        } catch (err) {
            return res.status(400).json(err.message);
        };

        return res.status(201).json({data: query});

    };

};

export default new UsersController;