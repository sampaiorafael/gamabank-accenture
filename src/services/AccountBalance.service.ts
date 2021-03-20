import { getRepository, UpdateResult } from 'typeorm';

import { AccountsBalance } from '../models/Account/AccountsBalance.model'

class AccountBalanceService {

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

    /**
     * 
     * @param destinyAccountNumber Acc Number that will recieve the operation
     * @param value ammount 
     * @param operation true to increase and false to decrease
     * @returns Update Result
     */
    public updateActualBalance = async (destinyAccountNumber: number, value: number, operation: boolean): Promise<object | string> => {

        const repository = getRepository(AccountsBalance);

        let actualMonth = (new Date().getMonth()) + 1;

        let actualBalanceRegister: AccountsBalance | undefined;
        let newBalanceRegister;
        let newActualBalance: number;

        try {
            actualBalanceRegister = await repository.findOne({ accountNumber: destinyAccountNumber, month: actualMonth })
        } catch (err) {
            throw err;
        };

        if (!actualBalanceRegister)
            return ('Não foi possível encontrar seu registro de balanço');


        operation ? newActualBalance = +actualBalanceRegister.actualBalance + +value : newActualBalance = +actualBalanceRegister.actualBalance - +value;      
        
        try {
            newBalanceRegister = await repository.update(actualBalanceRegister.id, { actualBalance: newActualBalance })
        } catch (err) {
            throw err;
        };
        
        if (!newBalanceRegister)
            return ('Registro de balanço não encontrado');

        return {
            "Mês do balanço": actualBalanceRegister.month,
            "Balanço inicial do mês": actualBalanceRegister.initialBalance,
            "Saldo anterior": actualBalanceRegister.actualBalance,
            "Novo saldo": +actualBalanceRegister.actualBalance + +value 
        }
        
    };

    /**
     * 
     * @param accountNumber
     * @returns actual balance number
     */
    public checkBalance = async (destinyAccountNumber: number): Promise<number | string> => {
        
        const repository = getRepository(AccountsBalance);

        let actualMonth = (new Date().getMonth()) + 1;

        let balanceRegister;

        try {
            balanceRegister = await repository.findOne({ accountNumber: destinyAccountNumber, month: actualMonth })
        } catch (err) {
            throw err; 
        };

        if (!balanceRegister)
            return ('Balance register not found');

        return balanceRegister.actualBalance;

    };

};

export default new AccountBalanceService();