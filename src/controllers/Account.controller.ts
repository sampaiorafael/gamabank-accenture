import { RequestHandler, Request, Response, NextFunction } from 'express';

import AccountBalanceService from '../services/AccountBalance.service';
import MonetaryService from '../services/Monetary.service';
import TransferService from '../services/Transfer.service';
import MovementService from '../services/Movement.service';
import JWTHandler from '../helpers/JWTHandler';
import isNegative from '../helpers/isNegative';
import validateCPF from '../helpers/validateCpf';

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
        let fromAccountNumber = id;

        let actualBalance; 

        try {
            actualBalance = await AccountBalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            return res.status(200).send('Registro de saldo não encontrado, tente novamente');
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
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        };

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { value } = req.body;

         if(!value)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');
        
        let selfDeposit;

        try {
            selfDeposit = await MonetaryService.accountDeposit(fromAccountNumber, value, 'Auto deposito')
        } catch (err) {
            return res.status(400).send('Deposito mal sucedido');
        };

        return res.status(200).send(selfDeposit);

    };

    public externDeposit: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const { name, cpf, accountNumber, value } = req.body;

         if(!value)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');

        if (!validateCPF(cpf))
            return res.status(400).send('CPF inválido');
        
        let deposit;

        try {
            deposit = await MonetaryService.accountDeposit(accountNumber, value, `Deposito externo de: ${name}, CPF: ${cpf}`)
        } catch (err) {
            return res.status(400).send('Deposito mal sucedido');
        };

        return res.status(200).json({deposit})

    };

    public internTransfer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        
        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        };

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { toUsername, value } = req.body;

        if (!toUsername || !value)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');
             
        let internTransfer;

        try {
            internTransfer = await TransferService.internTransfer(fromAccountNumber, toUsername, value);
        } catch (err) {
            return res.status(400).send('Transferência interna mal sucedida, verifique as informações e tente novamente');
        };

        return res.status(200).send(internTransfer);

    };

    public externTransfer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        
        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        };

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { bankCode, cpf, value } = req.body;

        if (!bankCode || !cpf || !value)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');
        
        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');

        let externTransfer;

        try {
            externTransfer = await TransferService.externTransfer(fromAccountNumber, bankCode, cpf, value)
        } catch (err) {
            return res.status(400).send('Transferência interna mal sucedida, verifique as informações e tente novamente');
        };

        return res.status(200).send(externTransfer);

    };

    public movementRecords: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        };

        let { id } = decodedToken;
        let fromAccountNumber = id;

        let movementRecords;

        try {
            movementRecords = await MovementService.movementRecords(fromAccountNumber);
        } catch (err) {
            return res.status(400).send('Histórico não encontrado, verifique suas informações e tente novamente');
        }

        return res.status(200).send(movementRecords);

    };

    public purchaseDebt: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        const token = req.headers.authorization;
        let decodedToken; 

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            decodedToken = await JWTHandler.verifyToken((token));
        } catch (err) {
            return res.status(400).send('Token inválido ou expirado');
        };

        let { id } = decodedToken;
        let fromAccountNumber = id;

        const { value } = req.body;

        if (!value)
            return res.status(400).send('Preencha todos os campos corretamente e tente novamente');

        if (isNegative(value))
            return res.status(400).send('O valor não pode ser menor ou igual a zero.');

        let purchaseDebt;

        try {
            purchaseDebt = await MonetaryService.purchaseDebt(fromAccountNumber, value)
        } catch (err) {
            return res.status(400).send('Não foi possível realizar a compra, verifique seu saldo e informações e tente novamente');
        };

        return res.status(200).send(purchaseDebt);

    };

};

export default new AccountController();