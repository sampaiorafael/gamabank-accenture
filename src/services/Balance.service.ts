import { getRepository } from 'typeorm';

import { AccountsBalance } from '../models/AccountsBalance.model'

class BalanceService {

    public firstBalance = async (accountId: number):Promise<AccountsBalance> => {
        const repository = getRepository(AccountsBalance);
        let month = (new Date().getMonth()) + 1;
        let initialBalance = 0;
        let actualBalance = 0;
        let finalBalance = 0;
        let query: AccountsBalance;

        try {
            query = await repository.save({accountId, month, initialBalance, actualBalance, finalBalance});
        } catch (err) {
            throw err;
        };

        return query;

    };

}

export default new BalanceService();