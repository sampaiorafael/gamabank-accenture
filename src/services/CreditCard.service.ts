import { getRepository } from 'typeorm';

import { CreditCards } from '../models/CreditCard/CreditCards.model';
import { CardEmitter } from '../models/CreditCard/CardEmitter.model'
import configs from '../config/configs';

class CreditCardsService {

    public newCreditCard = async (OwnerAccountNumber: number): Promise<CreditCards> => {

        const repository = getRepository(CreditCards);

        let newCreditCard: CreditCards;

        const { number, expireYear, securityCode, emitterId } = await this.newCreditCardInfo();
        const limitValue = configs.CreditCard.initialLimite
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

    private newCreditCardInfo = async (): Promise<any> => {

        let number: Array<number> | string  = [];
        let securityCode = Math.floor(Math.random() * (999 - 111) ) + 111;
        let expireYear = (new Date().getFullYear()) + 10;
        let emitterId = Math.round((Math.random() * 11));

        for (let i = 0; i < 16; i++) {
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
    }

};

export default new CreditCardsService();