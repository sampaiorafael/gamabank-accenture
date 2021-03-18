import { getRepository } from 'typeorm';

import { AccountsMovement } from '../models/Account/AccountsMovement.model';
import { CreditCardMovement } from '../models/CreditCard/CreditCardsMovement.model';

class MovementService {

    /**
     * 
     * @param accountNumber 
     * @param type 
     * @param value 
     * @param operation true, to add operation, false to sub
     * @returns 
     */
    public AccountPublishNewMovement = async (accountNumber: number, type: string, value: number, operation: boolean): Promise<AccountsMovement> => {

        const repository = getRepository(AccountsMovement);
        let newMovement: AccountsMovement;
        let date = new Date();

        operation ? +value : -value;

        try {
            newMovement = await repository.save({ accountNumber, type, value, date })
        } catch (err) {
            throw err;
        };

        return newMovement;
    };

    public movementRecords = async (destinyAccountNumber: number): Promise<any> => {

        const repository = getRepository(AccountsMovement);

        let actualMonth = (new Date().getMonth()) + 1;

        let movementRecords;

        try {
            movementRecords = await repository.find({ 
                where:{ accountNumber: destinyAccountNumber},
                order: { createdAt: 'DESC'},
                select: ['type', 'value', 'date']
            });
        } catch (err) {
            throw err;
        };

        if (!movementRecords)
            return ('Registros não encontrados');

        return movementRecords;

    };

    public creditCardPublishNewMovement = async (creditCardNumber: number, description: string, value: number, instalments: number, operation: boolean): Promise<CreditCardMovement> => {

        const repository = getRepository(CreditCardMovement);
        let newMovement: CreditCardMovement;

        if (!operation)
            description = 'invoice payment';

        try {
            newMovement = await repository.save({ creditCardNumber, description, value, instalments })
        } catch (err) {
            throw err;
        };

        return newMovement;

    }

};

export default new MovementService();