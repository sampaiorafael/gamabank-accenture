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

};

export default new MonetaryService();