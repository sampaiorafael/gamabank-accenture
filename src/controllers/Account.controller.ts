import { RequestHandler, Request, Response, NextFunction } from 'express';

import AccountBalanceService from '../services/AccountBalance.service';
import UsersService from '../services/Users.service';  
import MonetaryService from '../services/Monetary.service';
import TransferService from '../services/Transfer.service';
import MovementService from '../services/Movement.service';
import JWTHandler from '../helpers/JWTHandler';
import isNegative from '../helpers/isNegative';
import validateCPF from '../helpers/validateCpf';
import Mail from '../services/mail.service';

class AccountController {

    public checkBalance: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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

        let actualBalance; 

        try {
            actualBalance = await AccountBalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            return res.status(200).json({status: 'Registro de saldo não encontrado, tente novamente'});
        };

        return res.status(200).send({
            "Balanço atual": `R$ ${actualBalance}`,
            "Data da consulta": new Date()
        });

    };

    public selfDeposit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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

        const { value } = req.body;

         if(!value)
            return res.status(400).json('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).json('O valor não pode ser menor ou igual a zero.');
        
        let selfDeposit;

        try {
            selfDeposit = await MonetaryService.accountDeposit(fromAccountNumber, value, 'Auto deposito')
        } catch (err) {
            return res.status(400).json({status: 'Deposito mal sucedido'});
        };

        return res.status(200).json({sttus: selfDeposit});

    };

    public externDeposit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const { name, cpf, accountNumber, value } = req.body;

         if(!value)
            return res.status(400).json({status: 'Preencha todos os campos corretamente e tente novamente'});

        if (isNegative(value))
            return res.status(400).json({status: 'O valor não pode ser menor ou igual a zero.'});

        if (!validateCPF(cpf))
            return res.status(400).json({status: 'CPF inválido'});
        
        let deposit;

        try {
            deposit = await MonetaryService.accountDeposit(accountNumber, value, `Deposito externo de: ${name}, CPF: ${cpf}`)
        } catch (err) {
            return res.status(400).json({status: 'Deposito mal sucedido'});
        };

        return res.status(200).json(deposit);

    };

    public internTransfer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        
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

        const { toUsername, value } = req.body;

        if (!toUsername || !value)
            return res.status(400).json({status: 'Preencha todos os campos corretamente e tente novamente'});

        if (isNegative(value))
            return res.status(400).json({status: 'O valor não pode ser menor ou igual a zero.'});
             
        let internTransfer;

        try {
            internTransfer = await TransferService.internTransfer(fromAccountNumber, toUsername, value);
        } catch (err) {
            return res.status(400).json({status: 'Transferência interna mal sucedida, verifique as informações e tente novamente'});
        };

        return res.status(200).json(internTransfer);

    };

    public externTransfer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        
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

        const { bankCode, cpf, value } = req.body;

        if (!bankCode || !cpf || !value)
            return res.status(400).json({status: 'Preencha todos os campos corretamente e tente novamente'});
        
        if (isNegative(value))
            return res.status(400).json({status: 'O valor não pode ser menor ou igual a zero.'});

        let externTransfer;

        try {
            externTransfer = await TransferService.externTransfer(fromAccountNumber, bankCode, cpf, value)
        } catch (err) {
            return res.status(400).json({status: 'Transferência interna mal sucedida, verifique as informações e tente novamente'});
        };

        return res.status(200).json(externTransfer);

    };

    public movementRecords: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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

        const { operation, startDay, finishDay, daysBefore } = req.body;

        if (operation)
            if ( operation !== 'remove' && operation !== 'deposit') 
                return res.status(400).json({status: 'O parametro de operação está incorreto, só pode ser "remove" ou "deposit" para entradas e saidas'});

        let movementRecords;

        try {
            movementRecords = await MovementService.accountMovementRecords(fromAccountNumber, operation, startDay, finishDay, daysBefore);
        } catch (err) {
            return res.status(400).json({status: 'Histórico não encontrado, verifique suas informações e tente novamente'});
        }

        return res.status(200).json(movementRecords);

    };

    public purchaseDebt: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

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

        const { value } = req.body;

        if (!value)
            return res.status(400).json({status: 'Preencha todos os campos corretamente e tente novamente'});

        if (isNegative(value))
            return res.status(400).json({status: 'O valor não pode ser menor ou igual a zero.'});

        let purchaseDebt;

        try {
            purchaseDebt = await MonetaryService.purchaseDebt(fromAccountNumber, value)
        } catch (err) {
            return res.status(400).json({status: 'Não foi possível realizar a compra, verifique seu saldo e informações e tente novamente'});
        };
        
        let fullUser;

        try {
            fullUser = await UsersService.findFullByAccountNumber(fromAccountNumber)
        } catch (err) {
            return res.status(400).json({status: err});
        };

        Mail.sendBuyDebitMail(fullUser.username, fullUser.email, value);
        
        return res.status(200).json(purchaseDebt);

    };

};

export default new AccountController();