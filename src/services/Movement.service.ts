import { getRepository } from 'typeorm';

import { AccountsMovement } from '../models/AccountsMovement.model';

class MovementService {

    /**
     * 
     * @param accountNumber 
     * @param type 
     * @param value 
     * @param operation true, to add operation, false to sub
     * @returns 
     */
    public publishNewMovement = async (accountNumber: number, type: string, value: number, operation: boolean): Promise<AccountsMovement> => {

        const repository = getRepository(AccountsMovement);
        let newMovement: AccountsMovement;
        let date = new Date();

        operation ? +value : -value

        try {
            newMovement = await repository.save({ accountNumber, type, value, date })
        } catch (err) {
            throw err
        }

        return newMovement
    }

}

export default new MovementService();