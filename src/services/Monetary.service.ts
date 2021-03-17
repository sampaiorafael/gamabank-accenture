import AccountBalanceService from './AccountBalance.service'
import CreditCardBalanceService from './CreditCardBalance.service';
import CrediCardBalanceService from './CreditCardBalance.service';
import MovementService from './Movement.service';

class MonetaryService {

    public accountDeposit = async (destinyAccountNumber: number, value: number): Promise<any> => {

        let movementType = 'deposit';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await AccountBalanceService.updateActualBalance(destinyAccountNumber, value, true);
            newMovementRegister = await MovementService.publishNewMovement(destinyAccountNumber, movementType, value, true);
        } catch (err) {
            throw err;
        };

        return { newBalanceRegister, newMovementRegister };

    };

    public accountRemove = async (destinyAccountNumber: number, value: number): Promise<any> => {

        let movementType = 'remove';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await AccountBalanceService.updateActualBalance(destinyAccountNumber, value, false);
            newMovementRegister = await MovementService.publishNewMovement(destinyAccountNumber, movementType, value, false);
        } catch (err) {
            throw err;
        };

        return { newBalanceRegister, newMovementRegister };
    };

    public accountWithdraw = async (destinyAccountNumber: number, value: number): Promise<any> => {
    };

    public purchaseDebt = async (destinyAccountNumber: number, value: number): Promise<any> => {
        
        let actualBalanceFromAccount: number | string

        try {
            actualBalanceFromAccount = await AccountBalanceService.checkBalance(destinyAccountNumber);
        } catch (err) {
            throw err;
        };

        if (!(+actualBalanceFromAccount >= value))
            return ('Saldo insuficiente');
        
        let removeFromAccount;

        try {
            removeFromAccount = await this.accountRemove(destinyAccountNumber, value);
        } catch (err) {
            throw err;
        };

        if (!removeFromAccount)
            return ('Não foi possível debitar o dinheiro de sua conta corrente, tente novamente');

        return (removeFromAccount);

    };

    public purchaseCredit = async (destinyCrediCardNumber: number, description: string, value: number, instalments: number): Promise<any> => {
    
        let creditCardBalance;

        try {
            creditCardBalance = await CrediCardBalanceService.checkBalance(destinyCrediCardNumber);
        } catch (err) {
            throw err;
        };

        if (+creditCardBalance.availableBalance < +value)
            throw new Error(`Limite Insuficiente, limite disponível: ${creditCardBalance.availableBalance}`);

        let updateBalance;
        let newMovement;

        try {
            updateBalance = await CreditCardBalanceService.updateBalance(destinyCrediCardNumber, value, true);
            newMovement = await MovementService.creditCardPublishNewMovement(destinyCrediCardNumber, description, value, instalments, true);
        } catch (err) {
            throw err;
        };

        return {
            Purchase: {
                Description: description,
                Price: value,
                AvailableBalanceBeforePurchase: creditCardBalance.availableBalance,
                AvailableBalanceNextPurchase: creditCardBalance.availableBalance - value,
                Instalments: instalments
            }
        };

    };

};

export default new MonetaryService();