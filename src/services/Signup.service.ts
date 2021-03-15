import UsersService from './Users.service';
import ClientsService from './Clients.service';
import AccountsService from './Accounts.service'
import BalanceService from './Balance.service';
import DepositService from '../services/Deposit.service';

import mailer from '../services/mail.service'

class SingupService {

    public signup = async (username: string, password: string, email: string, name: string, cpf: string, adress: string, phone: string): Promise<object> => {
        
        let newUser;
        let newClient;
        let newAccount;
        let firstBalance;
        let firstDeposit;

        try {
            newUser = await UsersService.newUser(username, password, email, cpf);
            newClient = await ClientsService.newClient(newUser.id, name, adress, phone);
            newAccount = await AccountsService.newAccount(newUser.id);
            firstBalance = await BalanceService.firstBalance(newAccount.id);
            console.log('oi?');
            firstDeposit = await DepositService.accountDeposit(newAccount.id, 200);
        } catch (err) {
            throw err;
        };


        mailer.sendCreateAccountMail(username,newAccount.idBank,newAccount.agency,newAccount.accountNumber)

        return {newUser, newClient, newAccount, firstBalance, firstDeposit};
    }

}

export default new SingupService();