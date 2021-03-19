import { getRepository} from 'typeorm';

import BcryptHandler from '../helpers/BcryptHandler';
import AccountsService from './Accounts.service';
import { Users } from '../models/Users.model';
import { Clients } from '../models/Clients.model';

interface fullUser {
    username: string
    name: string,
    phone: string,
    email: string
};

class UsersService {

    public newUser = async (username: string, password: string, email: string, cpf: string): Promise<Users> => {

        const repository = getRepository(Users);
        let newUser: Users;
        password = BcryptHandler.hashPassword(password);

        try {
            newUser = await repository.save({username, password, email, cpf});
        } catch (err) {
            throw err;
        };

        return newUser;

    };

    public findByUsername = async (findUsername: string): Promise<Users> => {

        const repository = getRepository(Users);
        let user: Users | undefined;
        
        try {
            user = await repository.findOne({ username: findUsername });
        } catch (err) {
            throw err;
        };

        if (!user)
            throw new Error('Usuário não encontrado');
        
        return user;

    };

    public findUserById = async (id: number): Promise<Users> => {

        const repository = getRepository(Users);

        let user: Users | undefined

        try {
            user = await repository.findOne({ id: id })
        } catch (err) {
            throw err;
        };

        if(!user)
            throw new Error('Esse usuário não existe')

        return user
    };

    public findFullByAccountNumber = async (destinyAccountNumber: number): Promise<fullUser> => {

        const repository = getRepository(Clients);

        let account;
        let user;
        let client;

        try {
           account = await AccountsService.findAccountByNumber(destinyAccountNumber); 
           user = await this.findUserById(account.idUser);
           client = await repository.findOne({ idUser: account.idUser });
        } catch (err) {
            throw err;
        };

        if (!client)
            throw new Error('Não foi possível encontrar o cliente');

        return {
            username: user.username,
            name: client.name,
            phone: client.phone,
            email: user.email
        };

    };

};

export default new UsersService();