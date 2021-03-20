import { getRepository, Like, FindManyOptions, Between } from 'typeorm';

import { AccountsMovement } from '../models/Account/AccountsMovement.model';
import { CreditCardMovement } from '../models/CreditCard/CreditCardsMovement.model';

class MovementService {

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

    public accountMovementRecords = async (destinyAccountNumber: number, operationType?: string, startDay?: number, finishDay?: number, daysBefore?: number): Promise<any> => {

        const repository = getRepository(AccountsMovement);

        let now = new Date();
        let startDate;
        let finishDate;

        if (!operationType)
            operationType = '%o%';
        
        if (daysBefore) {
            startDay = +now.getDate() - +daysBefore;
            startDate = new Date(2021, now.getMonth(), startDay, 0, 0, 0, 0);
            finishDate = new Date(2021, now.getMonth(), now.getDate(), 23, 59, 59, 999);
        } else if (startDay && finishDay) {
            startDate = new Date(2021, now.getMonth(), startDay, 0, 0, 0, 0);
            finishDate = new Date(2021, now.getMonth(), finishDay, 23, 59, 59, 999);
        }else if (!daysBefore && !startDay && !finishDay){
            startDate = new Date(2021, now.getMonth(), 1, 0, 0, 0, 0);
            finishDate = new Date(2021, now.getMonth(), now.getDate(), 23, 59, 59, 999);
        };

        let movementRecords;

        try {
            movementRecords = await repository.find({ 
                where: { 
                    accountNumber: destinyAccountNumber, 
                    type: Like(operationType),
                    createdAt: Between(startDate, finishDate)
                },
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

};

export default new MovementService();