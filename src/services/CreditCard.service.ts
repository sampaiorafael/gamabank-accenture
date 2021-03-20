import { getRepository, Repository } from 'typeorm';

import { CreditCards } from '../models/CreditCard/CreditCards.model';
import { CardEmitter } from '../models/CreditCard/CardEmitter.model'
import configs from '../config/configs';

class CreditCardsService {

    public newCreditCard = async (OwnerAccountNumber: number): Promise<CreditCards> => {

        const repository = getRepository(CreditCards);

        let newCreditCard: CreditCards;

        const { number, expireYear, securityCode, emitterId } = await this.newCreditCardInfo();
        const limitValue = configs.CreditCard.initialLimit;
        const dueCloseDay = new Date().getDate();
        const duePayday = dueCloseDay + 7;
        const accountNumber = OwnerAccountNumber;

        try {
            newCreditCard = await repository.save({
                accountNumber,
                number,
                expireYear, 
                securityCode, 
                limitValue, 
                dueCloseDay,
                duePayday,
                emitterId
            })
        } catch (err) {
            throw err;
        };
            
        return newCreditCard;

    };

    public getCardEmmiterById = async (emmiterId: number ): Promise<CardEmitter> => {
        
        const repository = getRepository(CardEmitter);

        let cardEmmiter: CardEmitter | undefined;

        try {
            cardEmmiter = await repository.findOne({ id: emmiterId});
        } catch (err) {
            throw err;
        };

        if(!cardEmmiter)
            throw new Error('Não foi possível encontrar o emissor do cartão de crédito');

        return cardEmmiter;
    };

    public findCreditCardByAccountNumber = async (destinyAccountNumber: number): Promise<CreditCards> => {

        const repository = getRepository(CreditCards);

        let creditCard: CreditCards | undefined;

        try {
            creditCard = await repository.findOne({ accountNumber: destinyAccountNumber })
        } catch (err) {
            throw err;
        };

        if (!creditCard)
            throw new Error('Cartão de crédito não encontrado');
        
        return creditCard;

    };

    private newCreditCardInfo = async (): Promise<any> => {

        let number: Array<number> | string  = [];
        let securityCode = Math.floor(Math.random() * (999 - 100) ) + 100;
        let expireYear = (new Date().getFullYear()) + 10;
        let emitterId = Math.round((Math.random() * 11));

        for (let i = 0; i < 15; i++) {
            number.push( Math.round(Math.random() * 10) );
        };

        number = number.toString().replace(/[,. ]/g,'');

        return {
            number,
            expireYear,
            securityCode,
            emitterId
        };

    };

};

export default new CreditCardsService();