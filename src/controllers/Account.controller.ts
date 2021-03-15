import { RequestHandler, Request, Response, NextFunction } from 'express';

import BalanceService from '../services/Balance.service';
import DepositService from '../services/Deposit.service';
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
        let requestUserAccountNumber = id
        let actualBalance; 

        try {
            actualBalance = await BalanceService.checkBalance(requestUserAccountNumber);
        } catch (err) {
            return res.status(200).send('Balance register not found');
        }

        return res.status(200).json({Balance: actualBalance});

    };

    public selfDeposit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        }

        let { id } = decodedToken;

        let { value } = req.body
        let requestUserAccountNumber = id;
        let deposit;

        try {
            deposit = await DepositService.accountDeposit(requestUserAccountNumber, value)
        } catch (err) {
            return res.status(400).send('Deposito mal sucedido');
        };

        return res.status(200).json({deposit})

    }

};

export default new AccountController();