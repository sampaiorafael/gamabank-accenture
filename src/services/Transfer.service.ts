import { getRepository } from 'typeorm';

import BalanceService from './Balance.service';
import MonetaryService from './Monetary.service';

class TransferService {

    public internTransfer = async (fromAccountNumber: number, toAccountNumber: number, value: number): Promise<any> => {
        
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
            depositToAccount = await MonetaryService.accountDeposit(toAccountNumber, value);
            removeFromAccount = await MonetaryService.accountRemove(fromAccountNumber, value);
        } catch (err) {
            throw err;
        };

        return { depositToAccount, removeFromAccount }

    };

    public externTransfer = (fromAccountId: number, toAccountNumber: number, toAccountAgency: number, toBankNumber: number, type: string, value: number, description: string) => {
    };

};

export default new TransferService();