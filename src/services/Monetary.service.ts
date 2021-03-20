import AccountBalanceService from './AccountBalance.service'
import CreditCardBalanceService from './CreditCardBalance.service';
import MovementService from './Movement.service';
import payDueInvoice from '../types/payDueInvoice';

class MonetaryService {

    public accountDeposit = async (destinyAccountNumber: number, value: number, description: string): Promise<any> => {

        let movementType = 'deposit';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await AccountBalanceService.updateActualBalance(destinyAccountNumber, value, true);
            newMovementRegister = await MovementService.newAccountMovement(destinyAccountNumber, movementType, value, description);
        } catch (err) {
            throw err;
        };

        return { 
            "Deposito": {
                "Conta favorecida": destinyAccountNumber,
                "Valor depositado": value,
                "Data da operação": new Date(),
                "Valor": value
            }, 
        };

    };

    public accountRemove = async (destinyAccountNumber: number, value: number, description: string): Promise<any> => {

        let movementType = 'remove';
        let newMovementRegister;
        let newBalanceRegister;

        try {
            newBalanceRegister = await AccountBalanceService.updateActualBalance(destinyAccountNumber, value, false);
            newMovementRegister = await MovementService.newAccountMovement(destinyAccountNumber, movementType, value, description);
        } catch (err) {
            throw err;
        };

        return { newBalanceRegister, newMovementRegister };
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
            removeFromAccount = await this.accountRemove(destinyAccountNumber, value, 'Compra no débito');
        } catch (err) {
            throw err;
        };

        if (!removeFromAccount)
            return ('Não foi possível debitar o dinheiro de sua conta corrente, tente novamente');

        return (removeFromAccount);

    };

    public purchaseCredit = async (destinyCreditCardNumber: number, description: string, value: number, instalments: number): Promise<any> => {
        
        let creditCardBalance;

        try {
            creditCardBalance = await CreditCardBalanceService.checkBalance(destinyCreditCardNumber);
        } catch (err) {
            throw err;
        };

        if (+creditCardBalance.availableBalance < +value){
            throw 'Saldo insuficiente';
        }
            
        let updateBalance;
        let newMovement;

        try {
            updateBalance = await CreditCardBalanceService.updateBalance(destinyCreditCardNumber, value, true);
            newMovement = await MovementService.newCreditCardMovementMovement(destinyCreditCardNumber, description, value, instalments, true);
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

    public payDueInvoice = async (destinyCreditCardNumber: number, destinyAccountNumber: number): Promise<payDueInvoice> => {

        let due;
        let accountBalance;

        try {
            due = await CreditCardBalanceService.checkBalance(destinyCreditCardNumber);
            accountBalance = await AccountBalanceService.checkBalance(destinyAccountNumber);
        } catch (err) {
            throw err;
        };

        if (+due.dueBalance > +accountBalance){
            return {
                "status": 'Saldo Insuficiente',
            };
        };
            

        let newDue;
        let newAccountBalance;

        try {
            newDue = await CreditCardBalanceService.updateBalance(destinyCreditCardNumber, due.dueBalance, false);
            newAccountBalance = await AccountBalanceService.updateActualBalance(destinyAccountNumber, due.dueBalance, false)
        } catch (err) {
            throw err;
        };

        return {
            "status": 'Fatura paga', 
            "saldoAnterior": +accountBalance,
            "saldoAtual": +accountBalance - due.dueBalance,
            "valorDaFatura": +due.dueBalance
        };

    };

};

export default new MonetaryService();