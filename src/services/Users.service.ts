import { getRepository} from 'typeorm';

import BcryptHandler from '../helpers/BcryptHandler';
import { Users } from '../models/Users.model';

class UsersService {

    public newUser = async (username: string, password: string, email: string, cpf: string) : Promise<Users> => {

        const repository = getRepository(Users)
        let newUser: Users;
        password = BcryptHandler.hashPassword(password);

        try {
            newUser = await repository.save({username, password, email, cpf});
        } catch (err) {
            throw err
        }

        return newUser;

    };

    public findOne = async (findUsername: string): Promise<Users | undefined> => {

        const repository = getRepository(Users)
        let query: Users | undefined
        
        try {
            query = await repository.findOne({ username: findUsername });
        } catch (err) {
            throw err
        };
        
        return query

    }

};

export default new UsersService();