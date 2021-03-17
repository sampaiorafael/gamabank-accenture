import { getRepository} from 'typeorm';

import BcryptHandler from '../helpers/BcryptHandler';
import { Users } from '../models/Users.model';

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

};

export default new UsersService();