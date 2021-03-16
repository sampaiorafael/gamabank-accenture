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

    public movementRecords = async (destinyAccountNumber: number): Promise<any> => {

        const repository = getRepository(AccountsMovement);

        let actualMonth = (new Date().getMonth()) + 1;

        let movementRecords;

        try {
            movementRecords = await repository.find({ 
                where:{ accountNumber: destinyAccountNumber},
                order: { date: 'DESC'},
                select: ['type', 'value', 'date']
            });
        } catch (err) {
            throw err; 
        };

        if (!movementRecords)
            return ('Registros não encontrados');

        return movementRecords;

    }

}

export default new MovementService();