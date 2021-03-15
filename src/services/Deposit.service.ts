import { getRepository } from 'typeorm'

import BalanceService from './Balance.service'
import MovementService from './Movement.service';

class DepositService {

    public accountDeposit = async (destinyAccountNumber: number, value: number): Promise<any> => {

        let movementType = 'deposit';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await BalanceService.updateActualBalance(destinyAccountNumber, value)
            newMovementRegister = await MovementService.publishNewMovement(destinyAccountNumber, movementType, value)
        } catch (err) {
            throw err
        }

        return { newBalanceRegister, newMovementRegister };

    }

}

export default new DepositService();