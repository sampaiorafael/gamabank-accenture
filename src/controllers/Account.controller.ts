import { RequestHandler, Request, Response, NextFunction } from 'express';

import BalanceService from '../services/Balance.service';
import JWTHandler from '../helpers/JWTHandler';

class AccountController {

    public checkBalance: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(200).send('Token inválido ou expirado');
        }

        let { id } = decodedToken;
        let actualBalance; 

        try {
            actualBalance = await BalanceService.checkBalance(id);
        } catch (err) {
            return res.status(200).send('Balance register not found');
        }

        return res.status(200).json({Balance: actualBalance});

    };

};

export default new AccountController();