import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import ClientsController from './Clients.controller';
import AccountsController from './Accounts.controller';
import { Users } from '../models/Users.model';
class UsersController {

    public  create: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const repository = getRepository(Users);

        let { username, password, email, name, cpf, adress, phone } = req.body;

        if (!username || !password || !email || !name || !cpf || !adress || !phone) 
            return res.status(400).send('Estão faltando campos');
        
        let query;
        
        try {
            query = await repository.save({username, password, email, cpf});
            await ClientsController.create(query.id, name, adress, phone);
        } catch (err) {
            return res.status(400).json(err.message);
        };

        return res.status(201).json({data: query});

    };

};

export default new UsersController;