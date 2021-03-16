import { getRepository } from 'typeorm'

import BalanceService from './Balance.service'
import MovementService from './Movement.service';

class MonetaryService {

    public accountDeposit = async (destinyAccountNumber: number, value: number): Promise<any> => {

        let movementType = 'deposit';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await BalanceService.updateActualBalance(destinyAccountNumber, value, true);
            newMovementRegister = await MovementService.publishNewMovement(destinyAccountNumber, movementType, value, true);
        } catch (err) {
            throw err;
        };

        return { newBalanceRegister, newMovementRegister };

    };

    public accountRemove = async (destinyAccountNumber: number, value: number): Promise<any> => {

        let movementType = 'remove';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await BalanceService.updateActualBalance(destinyAccountNumber, value, false);
            newMovementRegister = await MovementService.publishNewMovement(destinyAccountNumber, movementType, value, false);
        } catch (err) {
            throw err;
        };

        return { newBalanceRegister, newMovementRegister };
    }

    public accountWithdraw = async (destinyAccountNumber: number, value: number): Promise<any> => {
    }

    public purchaseDebt = async (destinyAccountNumber: number, value: number): Promise<any> => {
        
        let actualBalanceFromAccount: number | string

        try {
            actualBalanceFromAccount = await BalanceService.checkBalance(destinyAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return ('Saldo insuficiente');
        
        let removeFromAccount;

        try {
            removeFromAccount = await this.accountRemove(destinyAccountNumber, value);
        } catch (err) {
            throw err;
        };

        if (!removeFromAccount)
            return ('Não foi possível debitar o dinheiro de sua conta corrente, tente novamente');

        return (removeFromAccount);

    } 

};

export default new MonetaryService();