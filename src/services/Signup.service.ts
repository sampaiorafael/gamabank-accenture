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

        Mail.sendSignUpMail(
            username, 
            newAccount.bankCode.toString(), 
            newAccount.agency.toString(), 
            newAccount.accountNumber.toString()
        );

        return { 
            "Novo cliente": {
                "Nome": newClient.name,
                "CPF": newUser.cpf,
                "Email": newUser.email,
                "Usuário": newUser.username,
                "Telefone": newClient.phone,
                "Endereço": newClient.adress
            },
            "Conta Corrente": {
                "Numero": newAccount.accountNumber,
                "Agência": newAccount.agency,
                "Saldo": firstAccountBalance.actualBalance
            },
            "Cartao de credito": {
                "Numero": newCreditCard.number,
                "Código de Segurança": newCreditCard.securityCode,
                "Ano de expiração": newCreditCard.expireYear,
                "Limite de credito": newCreditCard.limitValue,
                "Fechamento da fatura": newCreditCard.dueCloseDay,
                "Prazo pagamento da fatura": newCreditCard.duePayday,
                "Limite": newCreditCard.limitValue,
                "Emissor": cardEmitter.name
            }
         };
    
    };

};

export default new SingupService();