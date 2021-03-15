import UsersService from './Users.service';
import ClientsService from './Clients.service';
import AccountsService from './Accounts.service'
import BalanceService from './Balance.service';
import DepositService from '../services/Deposit.service';
<<<<<<< HEAD
import mailer from '../services/mail.service';
=======

import mailer from '../services/Mail.service'
>>>>>>> 3002e23b9faa9c6543cbf43b77418cc71a2e4f8f

class SingupService {

    public signup = async (username: string, password: string, email: string, name: string, cpf: string, adress: string, phone: string): Promise<object> => {
        
        let newUser;
        let newClient;
        let newAccount;
        let firstBalance;

        try {
            newUser = await UsersService.newUser(username, password, email, cpf);
            newClient = await ClientsService.newClient(newUser.id, name, adress, phone);
            newAccount = await AccountsService.newAccount(newUser.id);
            firstBalance = await BalanceService.firstBalance(newAccount.id);
        } catch (err) {
            throw err;
        };

        mailer.sendCreateAccountMail(username,newAccount.idBank,newAccount.agency,newAccount.accountNumber)

        return {newUser, newClient, newAccount, firstBalance };
    }

}

export default new SingupService();