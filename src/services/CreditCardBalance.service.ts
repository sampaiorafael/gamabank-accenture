import { getRepository } from 'typeorm'

import { CreditCardBalance } from '../models/CreditCard/CreditCardsBalance.model'
import configs from '../config/configs'

class CreditCardBalanceService { 
   
   public firstBalance = async (creditCardNumber: number): Promise<any> => {

      const repository = getRepository(CreditCardBalance)
      let month = (new Date().getMonth()) + 1;
      let availableBalance = configs.CreditCard.initialLimite
      let dueBalance = 0
      let firstBalance: CreditCardBalance

      try {
         firstBalance = await repository.save({
            month, availableBalance, dueBalance, creditCardNumber
         })
      } catch (err) {
        throw err 
      } 

      return firstBalance
   }

}

export default new CreditCardBalanceService()

