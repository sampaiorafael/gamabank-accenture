import { getRepository } from 'typeorm';

import AccountBalanceService from './AccountBalance.service';
import MonetaryService from './Monetary.service';
import UserService from './Users.service';
import AccountsService from './Accounts.service';
import { Banks } from '../models/Banks.model';

class TransferService {

    public internTransfer = async (fromAccountNumber: number, toUsername: string, value: number): Promise<object | string> => {
        
        let toUser;

        try {
            toUser = await UserService.findByUsername(toUsername);
        } catch (err) {
            throw err;
        };

        let toAccount;

        try {
            toAccount = await AccountsService.findAccountByUserId(toUser.id)
        } catch (err) {
            throw err;
        };

        let actualBalanceFromAccount: number | string

        try {
            actualBalanceFromAccount = await AccountBalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return ('Saldo insuficiente');
        
        let depositToAccount;
        let removeFromAccount;

        try {
            depositToAccount = await MonetaryService.accountDeposit(toAccount.accountNumber, value, 'Transferência interna');
            removeFromAccount = await MonetaryService.accountRemove(fromAccountNumber, value, 'Transferência interna');
        } catch (err) {
            throw err;
        };

        return {
            "Tranferência Interna": {
                "Favorecido": {
                    "Usuário": toUser.password,
                    "CPF": toUser.cpf,
                    "Email": toUser.email,
                    "Conta": toAccount.accountNumber,
                    "Agência": toAccount.agency,
                },
                "Origem": {
                    "Conta": fromAccountNumber
                },
                "Operação": {
                    "Valor": value,
                    "Data da operação": new Date()
                }
            }
        };

    };
    
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
            actualBalanceFromAccount = await AccountBalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return('Saldo insuficiente');

        let removeFromAccount;

        try {
            removeFromAccount = await MonetaryService.accountRemove(fromAccountNumber, value, 'Transferência externa');
        } catch (err) {
            throw err
        }

        if(!removeFromAccount)
            return('Conta de origem não encontrada');

        return {
            "Transferência Externa": {
                "Origem": {
                    "Conta": fromAccountNumber,
                    "Saldo anterior": actualBalanceFromAccount,
                    "Novo saldo": +actualBalanceFromAccount - +value
                },
                "Favorecido": {
                    "CPF": cpf,
                    "Código do banco": bank.code,
                    "Nome do banco": bank.name
                },
                "Operação": {
                    "Valor": value,
                    "Data da operação": new Date()
                }
            }
        };

    };

};

export default new TransferService();