import { RequestHandler, Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import UsersController from './Users.controller'
import { Accounts } from '../models/Accounts.model';

class AccountsController {

    public create = async (idUser: number): Promise<boolean> => {

        const repository = getRepository(Accounts);

        const accNum = await this.generateAccNumber();

        try {
            await repository.save({ idUser, accNum });
        } catch (err) {
            throw err
        }

        return true
    };

    private async generateAccNumber (): Promise<Number> {
        return await UsersController.lastAccountCreated() + 1
    }

};

export default new AccountsController();