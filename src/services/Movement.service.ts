import { getRepository } from 'typeorm';

import { AccountsMovement } from '../models/AccountsMovement.model';

class MovementService {

    public publishNewMovement = async (accountNumber: number, type: string, value: number): Promise<AccountsMovement> => {

        const repository = getRepository(AccountsMovement);
        let newMovement: AccountsMovement;
        let date = new Date();

        try {
            newMovement = await repository.save({ accountNumber, type, value, date})
        } catch (err) {
            throw err
        }

        return newMovement
    }

}

export default new MovementService();