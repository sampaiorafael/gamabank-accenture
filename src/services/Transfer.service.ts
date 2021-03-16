import { getRepository } from 'typeorm';

import BalanceService from './Balance.service';
import MonetaryService from './Monetary.service';
import UserService from './Users.service';
import AccountsService from './Accounts.service';
import { Banks } from '../models/Banks.model';

class TransferService {

    //Publicar na tabela de transferencias internas
    public internTransfer = async (fromAccountNumber: number, toUsername: string, value: number): Promise<object | string> => {
        
        let user;

        try {
            user = await UserService.findByUsername(toUsername);
        } catch (err) {
            throw err;
        };

        let toAccount;

        try {
            toAccount = await AccountsService.findAccountByUserId(user.id)
        } catch (err) {
            throw err;
        };

        let actualBalanceFromAccount: number | string

        try {
            actualBalanceFromAccount = await BalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return ('Saldo insuficiente');
        
        let depositToAccount;
        let removeFromAccount;

        try {
            depositToAccount = await MonetaryService.accountDeposit(toAccount.accountNumber, value);
            removeFromAccount = await MonetaryService.accountRemove(fromAccountNumber, value);
        } catch (err) {
            throw err;
        };

        return { depositToAccount, removeFromAccount };

    };
    
    //Publicar na tabela de transferencias externas
    public externTransfer = async (fromAccountNumber: number, bankCode: number, cpf: string, value: number): Promise<object | string> => {
        
        const repository = getRepository(Banks);

        let bank: Banks | undefined



        try {
            bank = await repository.findOne({ code: bankCode });
        } catch (err) {
            throw err;
        };

        if (!bank)
            return('Banco não encontrado');
        
        let actualBalanceFromAccount: number | string;

        try {
            actualBalanceFromAccount = await BalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return('Saldo insuficiente');

        let removeFromAccount;

        try {
            removeFromAccount = await MonetaryService.accountRemove(fromAccountNumber, value);
        } catch (err) {
            throw err
        }

        if(!removeFromAccount)
            return('Conta de origem não encontrada');

        return {
            Operation: 'External Transfer',
            OriginAccountNumber: fromAccountNumber,
            DestinyAccountCPF: cpf,
            DestinyBank: bank?.name,
            Value: value
        }

    };

};

export default new TransferService();