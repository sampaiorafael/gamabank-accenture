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

    /**
     * 
     * @param destinyAccountNumber Acc Number that will recieve the operation
     * @param value ammount 
     * @param operation true to increase and false to decrease
     * @returns Update Result
     */
    public updateActualBalance = async (destinyAccountNumber: number, value: number, operation: boolean): Promise<UpdateResult> => {

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


        operation ? newActualBalance = +balanceRegister.actualBalance + +value : newActualBalance = +balanceRegister.actualBalance - +value;      
        
        try {
            newBalanceRegister = await repository.update(balanceRegister.id, { actualBalance: newActualBalance })
        } catch (err) {
            throw err;
        };
        
        if (!newBalanceRegister)
            throw new Error('Registro de balanço não encontrado');

        return newBalanceRegister;
    };

    /**
     * 
     * @param accountNumber
     * @returns actual balance number
     */
    public checkBalance = async (destinyAccountNumber: number): Promise<number> => {
        
        const repository = getRepository(AccountsBalance);

        let actualMonth = (new Date().getMonth()) + 1;

        let balanceRegister;

        try {
            balanceRegister = await repository.findOne({ accountNumber: destinyAccountNumber, month: actualMonth })
        } catch (err) {
            console.log(err)
            throw err; 
        };

        if (!balanceRegister)
            throw new Error('Balance register not found');

        return balanceRegister.actualBalance;

    };

};

export default new BalanceService();