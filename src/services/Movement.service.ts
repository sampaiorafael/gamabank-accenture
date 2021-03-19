import { getRepository, Like } from 'typeorm';

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
    public newAccountMovement = async (accountNumber: number, type: string, value: number, description: string): Promise<object | string> => {

        const repository = getRepository(AccountsMovement);
        let newMovement: AccountsMovement;

        try {
            newMovement = await repository.save({ accountNumber, type, value, description })
        } catch (err) {
            throw err;
        };

        if(!newMovement)
            return ('Não foi possível realizar o lançamento da movimentação');

        return {
            "Nova Movimentação": {
                "Origem": newMovement.accountNumber,
                "Tipo": newMovement.type,
                "Valor": newMovement.value,
                "Descrição": newMovement.description
            }
        };
    };

    public movementRecords = async (destinyAccountNumber: number, operationType?: string): Promise<any> => {

        const repository = getRepository(AccountsMovement);

        let movementRecords;

        if (!operationType)
            operationType = '%o%'

        try {
            movementRecords = await repository.find({ 
                where: { accountNumber: destinyAccountNumber, type: Like(operationType) },
                order: { createdAt: 'DESC' },
                select: ['type', 'value', 'description', 'createdAt'],
            });
        } catch (err) {
            throw err;
        };

        if (!movementRecords)
            return ('Registros não encontrados');

        return {
            "Registro de movimentações": {
                movementRecords
            }
        };

    };

    public newCreditCardMovementMovement = async (creditCardNumber: number, description: string, value: number, instalments: number, operation: boolean): Promise<CreditCardMovement> => {

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