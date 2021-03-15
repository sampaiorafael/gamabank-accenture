import { getRepository } from 'typeorm'

import { AccountsBalance } from '../models/AccountsBalance.model'
import findAccount from '../services/Accounts.service';

class DepositService {

    public accountDeposit = async (findAccountId: number, value: number): Promise<any> => {

        console.log('hi')

        const repository = getRepository(AccountsBalance);
        let actualMonth = (new Date().getMonth()) + 1;
        let accountBalanceRegister;

        try {
            accountBalanceRegister = await repository.findOne({month: actualMonth, accountId: findAccountId})
        } catch (err) {
            throw err
        }

        if (!accountBalanceRegister?.actualBalance)
            throw new Error('Balance not found');
            
        let newBalance = accountBalanceRegister?.actualBalance + value;

        let updateBalance;

        try {
            updateBalance = repository.update(accountBalanceRegister.id, {actualBalance: newBalance})
        } catch (err) {
            throw err
        }

        console.log(updateBalance);



    }

}

export default new DepositService();