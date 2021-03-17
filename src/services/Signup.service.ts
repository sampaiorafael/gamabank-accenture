import UsersService from './Users.service';
import ClientsService from './Clients.service';
import AccountsService from './Accounts.service'
import AccountBalanceService from './AccountBalance.service';
import CreditCardsService from './CreditCard.service';
import Mail from './mail.service'

class SingupService {

    public signup = async (username: string, password: string, email: string, name: string, cpf: string, adress: string, phone: string): Promise<object> => {
        
        let newUser;
        let newClient;
        let newAccount;
        let newCreditCard;
        let cardEmitter;
        let firstAccountBalance;

        try {
            newUser = await UsersService.newUser(username, password, email, cpf);
            newClient = await ClientsService.newClient(newUser.id, name, adress, phone);
            newAccount = await AccountsService.newAccount(newUser.id);
            firstAccountBalance = await AccountBalanceService.firstBalance(newAccount.id);
            newCreditCard = await CreditCardsService.newCreditCard(newAccount.id);
            cardEmitter = await CreditCardsService.getCardEmmiterById(newCreditCard.emitterId);
        } catch (err) {
            throw err;
        };

        Mail.sendCreateAccountMail(
            username, 
            newAccount.bankCode.toString(), 
            newAccount.agency.toString(), 
            newAccount.accountNumber.toString()
        );

        return { 
            NovoCliente: {
                Nome: newClient.name,
                CPF: newUser.cpf,
                Email: newUser.email,
                Usuário: newUser.username,
                Telefone: newClient.phone,
                Endereço: newClient.adress
            },
            ContaCorrente: {
                Numero: newAccount.accountNumber,
                Agencia: newAccount.agency,
                Saldo: firstAccountBalance.actualBalance
            },
            CartaoDeCredito: {
                Numero: newCreditCard.number,
                CodigoDeSegurança: newCreditCard.securityCode,
                AnoDeExpiracao: newCreditCard.expireYear,
                LimiteDeCredito: newCreditCard.limitValue,
                DiaFechamentoFatura: newCreditCard.dueCloseDay,
                DiaLimitePagamentoFatura: newCreditCard.duePayday,
                Emissor: cardEmitter.name
            }

         };
    }

}

export default new SingupService();