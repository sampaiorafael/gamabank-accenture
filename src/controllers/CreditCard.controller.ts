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
            return res.status(401).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(401).send('Token inválido ou expirado');
        }

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { value, description, instalments } = req.body;

        if (!value || !description || !instalments)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value) || isNegative(instalments) )
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');

        let creditCard;

        try {
            creditCard = await CreditCardService.findCreditCardByAccountNumber(fromAccountNumber);
        } catch (err) {
            return res.status(400).send(err);
        };

        let purchase;

        try {
            purchase = await MonetaryService.purchaseCredit(creditCard.number, description, value, instalments);
        } catch (err) {
            return res.status(400).send(err);
        };

        let fullUser;

        try {
            fullUser = await UsersService.findFullByAccountNumber(fromAccountNumber)
        } catch (err) {
            return res.status(400).send(err);
        };

        Mail.sendBuyCreditMail(
            fullUser.name, 
            value,
            description,
            purchase.Purchase.AvailableBalanceNextPurchase.toString(),
            instalments
        );

        Notify(`${fullUser.phone}`, `Compra no crédito no valor de R$ ${value} em ${description}, seu saldo disponível é R$ ${purchase.Purchase.AvailableBalanceNextPurchase.toString()}`);

        return res.status(200).send(purchase);
        
    };

    public checkInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(401).send('Token de autenticação não encontrado');

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
        
        //ver com Rafael
        Mail.sendInvoiceMail('usuario',invoice.Purchases)

        return res.status(200).send(invoice);

    }

    public payDueInvoice: RequestHandler = async (req:Request, res: Response, next: NextFunction): Promise<Response> => {
        
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

        let payDueInvoice;

        try {
            payDueInvoice = await MonetaryService.payDueInvoice(creditCard.number, fromAccountNumber);
        } catch (err) {
            throw err;
        };

        return res.status(200).send(payDueInvoice);

    }

};

export default new CreditCardController();