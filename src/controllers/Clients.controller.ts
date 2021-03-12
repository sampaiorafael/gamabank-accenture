import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Clients } from '../models/Clients.model';

class ClientsController {

    public  create = async (idUser: number, name: string, adress: string, phone: string): Promise<boolean> => {

        const repository = getRepository(Clients);

        try {
            await repository.save({idUser, name, adress, phone});
        } catch (err) {
            return false
        }
        return true
    };

};

export default new ClientsController;