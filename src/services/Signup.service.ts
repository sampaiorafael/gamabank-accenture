import UsersService from './Users.service';
import ClientsService from './Clients.service';
import AccountsService from './Accounts.service'
import AccountBalanceService from './AccountBalance.service';
import CreditCardsService from './CreditCard.service';
import CreditCardBalanceService from './CreditCardBalance.service';
import Mail from './mail.service'

class SingupService {

    public signup = async (username: string, password: string, email: string, name: string, cpf: string, adress: string, phone: string): Promise<object> => {
        
        let newUser;
        let newClient;
        let newAccount;
        let newCreditCard;
        let cardEmitter;
        let firstAccountBalance;
        let firstCreditCardBalance;

        try {
            newUser = await UsersService.newUser(username, password, email, cpf);
            newClient = await ClientsService.newClient(newUser.id, name, adress, phone);
            newAccount = await AccountsService.newAccount(newUser.id);
            firstAccountBalance = await AccountBalanceService.firstBalance(newAccount.id);
            newCreditCard = await CreditCardsService.newCreditCard(newAccount.id);
            cardEmitter = await CreditCardsService.getCardEmmiterById(newCreditCard.emitterId);
            firstCreditCardBalance = await CreditCardBalanceService.firstBalance(newCreditCard.number);
        } catch (err) {
            throw err;
        };

        let sendSignupEmail;

        try {
            sendSignupEmail = await Mail.sendSignUpMail(
                username, 
                newAccount.bankCode.toString(), 
                newAccount.agency.toString(), 
                newAccount.accountNumber.toString()
            );
        } catch (err) {
            throw err
        }

        

        return { 
            "Nome": newClient.name,
            "CPF": newUser.cpf,
            "Email": newUser.email,
            "Usuario": newUser.username,
            "Telefone": newClient.phone,
            "Endereco": newClient.adress,
            "NumeroDaConta": newAccount.accountNumber,
            "Agencia": newAccount.agency,
            "Saldo": firstAccountBalance.actualBalance,
            "NumeroDoCartãoDeCrédito": newCreditCard.number,
            "CodigoDeSeguranca": newCreditCard.securityCode,
            "AnoDeExpiracao": newCreditCard.expireYear,
            "LimiteDeCredito": newCreditCard.limitValue,
            "FechamentoDaFatura": newCreditCard.dueCloseDay,
            "PrazoPagamentoFatura": newCreditCard.duePayday,
            "Limite": newCreditCard.limitValue,
            "Emissor": cardEmitter.name
        };
    
    };

};

export default new SingupService();