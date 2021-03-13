import UsersService from './Users.service';
import ClientsService from './Clients.service';
import AccountsService from './Accounts.service'

class SingupService {

    public signup = async (username: string, password: string, email: string, name: string, cpf: string, adress: string, phone: string): Promise<object> => {
        
        let newUser;
        let newClient;
        let newAccount;

        try {
            newUser = await UsersService.newUser(username, password, email, cpf);
        } catch (err) {
            return err.mesage;
        };

        try {
            newClient = await ClientsService.newClient(newUser.id, name, adress, phone);
        } catch (err) {
            return err.mesage;
        };

        try {
            newAccount = await AccountsService.newAccount(newUser.id);
        } catch (err) {
            return err.mesage;
        };

        return {newUser, newClient, newAccount};
    }

}

export default new SingupService();