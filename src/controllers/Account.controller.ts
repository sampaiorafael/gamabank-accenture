import { RequestHandler, Request, Response, NextFunction } from 'express';

import BalanceService from '../services/Balance.service';
import MonetaryService from '../services/Monetary.service';
import TransferService from '../services/Transfer.service';
import JWTHandler from '../helpers/JWTHandler';
import isNegative from '../helpers/isNegative'

class AccountController {

    public checkBalance: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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
        let requestUserAccountNumber = id;

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
        let requestUserAccountNumber = id;

        const { value } = req.body

        if(!value)
            return res.status(400).send('Valor não informado'); 

        if (isNegative(value))
            return res.status(400).send('Valor não pode ser menor ou igual a zero.');
        
        let deposit;

        try {
            deposit = await MonetaryService.accountDeposit(requestUserAccountNumber, value)
        } catch (err) {
            return res.status(400).send('Deposito mal sucedido');
        };

        return res.status(200).json({deposit})

    }

    public internTransfer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        
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
        let requestUserAccountNumber = id;

        const { toAccountNumber, value } = req.body

        if (!toAccountNumber || !value)
            return res.status(400).send('Conta destino ou valor não informado, tente novamente');

        if (isNegative(value))
            return res.status(400).send('Valor não pode ser menor ou igual a zero.');  
             
        let internTransfer;

        try {
            internTransfer = await TransferService.internTransfer(requestUserAccountNumber, toAccountNumber, value )
        } catch (err) {
            return res.status(400).send(err);
        }

        return res.status(200).send(internTransfer);

    }

};

export default new AccountController();