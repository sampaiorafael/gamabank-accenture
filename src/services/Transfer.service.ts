import { getRepository } from 'typeorm';

import BalanceService from './Balance.service';
import MonetaryService from './Monetary.service';
import UserService from './Users.service';
import AccountsService from './Accounts.service';

class TransferService {

    public internTransfer = async (fromAccountNumber: number, toUsername: string, value: number): Promise<any> => {
        
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

        let actualBalanceFromAccount: number

        try {
            actualBalanceFromAccount = await BalanceService.checkBalance(fromAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return ('Insufficient funds')
        
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

    public externTransfer = (fromAccountId: number, toAccountNumber: number, toAccountAgency: number, toBankNumber: number, type: string, value: number, description: string) => {
    
    };

};

export default new TransferService();