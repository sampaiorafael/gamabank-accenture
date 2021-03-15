import { getRepository, UpdateResult } from 'typeorm';

import { AccountsBalance } from '../models/AccountsBalance.model'

class BalanceService {

    public firstBalance = async (accountNumber: number):Promise<AccountsBalance> => {

        const repository = getRepository(AccountsBalance);
        let month = (new Date().getMonth()) + 1;
        let initialBalance = 0;
        let actualBalance = 0;
        let finalBalance = 0;
        let firstBalance: AccountsBalance;

        try {
            firstBalance = await repository.save({ accountNumber, month, initialBalance, actualBalance, finalBalance });
        } catch (err) {
            throw err;
        };

        return firstBalance;

    };

    public updateActualBalance = async (destinyAccountNumber: number, value: number): Promise<UpdateResult> => {

        const repository = getRepository(AccountsBalance);

        let actualMonth = (new Date().getMonth()) + 1;

        let balanceRegister: AccountsBalance | undefined;
        let newBalanceRegister;
        let newActualBalance: number;

        try {
            balanceRegister = await repository.findOne({ accountNumber: destinyAccountNumber, month: actualMonth })
        } catch (err) {
            throw err;
        };

        if (!balanceRegister)
            throw new Error('Registro de balanço não encontrado');

        newActualBalance = balanceRegister.actualBalance; + value;

        try {
            newBalanceRegister = await repository.update(balanceRegister.id, { actualBalance: newActualBalance })
        } catch (err) {
            throw err;
        };
        
        if (!newBalanceRegister)
            throw new Error('Registro de balanço não encontrado');

        return newBalanceRegister;
    };

};

export default new BalanceService();