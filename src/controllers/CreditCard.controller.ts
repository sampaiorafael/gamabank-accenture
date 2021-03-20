import { RequestHandler, Request, Response, NextFunction } from 'express';

import MonetaryService from '../services/Monetary.service';
import CreditCardService from '../services/CreditCard.service';
import CreditCardBalanceService from '../services/CreditCardBalance.service';
import UsersService from '../services/Users.service';  
import JWTHandler from '../helpers/JWTHandler';
import isNegative from '../helpers/isNegative';
import Mail from '../services/mail.service';
import Notify from '../services/Notification.service';

class CreditCardController {

    public purchaseCredit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).json({status: 'Token de autenticação não encontrado'});

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).json({status: 'Token inválido ou expirado'});
        }

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { value, description, instalments } = req.body;

        if (!value || !description || !instalments)
            return res.status(400).json({status: 'Preencha todos os campos corretamente e tente novamente'});

        if (isNegative(value) || isNegative(instalments) )
            return res.status(400).json({status: 'O valor não pode ser menor ou igual a zero.'});

        let creditCard;

        try {
            creditCard = await CreditCardService.findCreditCardByAccountNumber(fromAccountNumber);
        } catch (err) {
            return res.status(400).json({status: err});
        };

        let purchase;

        try {
            purchase = await MonetaryService.purchaseCredit(creditCard.number, description, value, instalments);
        } catch (err) {
            return res.status(400).json({status: err});
        };

        let fullUser;

        try {
            fullUser = await UsersService.findFullByAccountNumber(fromAccountNumber)
        } catch (err) {
            return res.status(400).json({status: err});
        };

        let email;

        try {
            email = await Mail.sendBuyCreditMail(
                fullUser.name,  
                fullUser.email, 
                value, 
                description, 
                purchase.Purchase.AvailableBalanceNextPurchase.toString(), 
                instalments
            );
        } catch (err) {
            return res.status(400).json({status: err});
        };
        
        const info: object = {  
                        value,
                        description, 
                        balance: purchase.Purchase.AvailableBalanceNextPurchase.toString()
                    };
        
        Notify(`${fullUser.phone}`, info);

        return res.status(200).json({purchase, email});
        
    };

    public checkInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).json({status: 'Token de autenticação não encontrado'});

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).json({status: 'Token inválido ou expirado'});
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
            return res.status(400).json({status: 'Não foi possível verificar sua fatura'});
        };

        let fullUser;

        try {
            fullUser = await UsersService.findFullByAccountNumber(fromAccountNumber)
        } catch (err) {
            return res.status(400).json({status: err});
        };
        
        let email;

        try {
            email = await Mail.sendInvoiceMail(fullUser.username, fullUser.email ,invoice.creditCardsMovements)
        } catch (err) {
            return res.status(400).json({status: err});
        };

        return res.status(200).json(invoice);

    };

    public payDueInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {
        
        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).json({status: 'Token de autenticação não encontrado'});

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).json({status: 'Token inválido ou expirado'});
        }

        let { id } = decodedToken;
        let fromAccountNumber = id;

        let creditCard;

        try {
            creditCard = await CreditCardService.findCreditCardByAccountNumber(fromAccountNumber);
        } catch (err) {
            return res.status(400).json({status: err});
        };

        let payDueInvoice;

        try {
            payDueInvoice = await MonetaryService.payDueInvoice(creditCard.number, fromAccountNumber);
        } catch (err) {
            return res.status(400).json({status: err});
        };

        let fullUser;

        try {
            fullUser = await UsersService.findFullByAccountNumber(fromAccountNumber)
        } catch (err) {
            return res.status(400).json({status: err});
        };
        
        Mail.sendPayInvoiceMail(fullUser.username, fullUser.email, 10, 200); 

        return res.status(200).json(payDueInvoice);

    };

};

export default new CreditCardController();
