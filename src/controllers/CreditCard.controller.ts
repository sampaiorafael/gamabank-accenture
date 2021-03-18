import { RequestHandler, Request, Response, NextFunction } from 'express';

import MonetaryService from '../services/Monetary.service';
import CreditCardService from '../services/CreditCard.service';
import CreditCardBalanceService from '../services/CreditCardBalance.service';
import JWTHandler from '../helpers/JWTHandler';
import isNegative from '../helpers/isNegative';

class CreditCardController {

    public purchaseCredit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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
        let fromAccountNumber = id;

        const { value, description, instalments } = req.body;

        if (!value || !description || !instalments)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');

        let creditCard;

        try {
            creditCard = await CreditCardService.findCreditCardByAccountNumber(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        let purchase;

        try {
            purchase = await MonetaryService.purchaseCredit(creditCard.number, description, value, instalments);
        } catch (err) {
            throw err;
        };

        return res.status(200).send(purchase);
        
    };

    public checkInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {

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
        let fromAccountNumber = id;

        let creditCard;

        try {
            creditCard = await CreditCardService.findCreditCardByAccountNumber(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        let invoice;

        try {
            invoice = await CreditCardBalanceService.checkInvoice(creditCard.number);
        } catch (err) {
            return res.status(400).send('Não foi possível verificar sua fatura');
        };

        return res.status(200).send(invoice);

    }

    // public payInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {
    // }

};

export default new CreditCardController();