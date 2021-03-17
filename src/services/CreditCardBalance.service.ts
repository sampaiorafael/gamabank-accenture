import { getRepository, UpdateResult } from 'typeorm'

import { CreditCardBalance } from '../models/CreditCard/CreditCardsBalance.model'
import configs from '../config/configs'

class CreditCardBalanceService { 
   
   public firstBalance = async (creditCardNumber: number): Promise<any> => {

      const repository = getRepository(CreditCardBalance);
      let month = (new Date().getMonth()) + 1;
      let availableBalance = configs.CreditCard.initialLimit;
      let dueBalance = 0;
      let firstBalance: CreditCardBalance;

      try {
         firstBalance = await repository.save({month, availableBalance, dueBalance, creditCardNumber});
      } catch (err) {
        throw err;
      } ;

      return firstBalance;
   };

   public checkBalance = async (destinyCrediCardNumber: number): Promise<CreditCardBalance> => {

      const repository = getRepository(CreditCardBalance);

      let balance: CreditCardBalance | undefined;

      try {
         balance = await repository.findOne({ creditCardNumber: destinyCrediCardNumber })
      } catch (err) {
         throw err;
      };

      if(!balance)
         throw new Error('Não foi possível encontrar o balanço desse número de cartão');

      return balance;

   };

   /**
    * 
    * @param destinyCrediCardNumber 
    * @param value 
    * @param operation true for purchase, false for payment
    * @returns 
    */
   public updateBalance = async (destinyCrediCardNumber: number, value: number, operation: boolean): Promise<UpdateResult> => {

      const repository = getRepository(CreditCardBalance);

      let actualMonth = (new Date().getMonth()) + 1;

      let actualBalanceRegister;
      let newBalanceRegister: any
      let newAvaliableBalance;
      let newDueBalance;

      try {
         actualBalanceRegister = await repository.findOne({ creditCardNumber: destinyCrediCardNumber, month: actualMonth })
      } catch (err) {
         throw err
      }

      if (!actualBalanceRegister)
         throw new Error('Não foi possível encontrar seu registro de balanço');

      if (operation){
         newAvaliableBalance = +actualBalanceRegister.availableBalance - +value;
         newDueBalance = -actualBalanceRegister.dueBalance + +value;
      } else {
         newAvaliableBalance = +actualBalanceRegister.availableBalance + +value;
         newDueBalance = -actualBalanceRegister.dueBalance - +value;
      };

      try {
         newBalanceRegister = repository.update(actualBalanceRegister.id, 
            {
               availableBalance: newAvaliableBalance,
               dueBalance: newDueBalance
            }
         );
      } catch (err) {
         throw err;
      };

      return newBalanceRegister;

   };

   public checkInvoice = async (): Promise<any> => {

   }

};

export default new CreditCardBalanceService();

