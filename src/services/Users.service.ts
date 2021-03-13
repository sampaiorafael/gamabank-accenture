import { getRepository} from 'typeorm';

import BcryptHandler from '../helpers/BcryptHandler';
import { Users } from '../models/Users.model';

class UsersService {

    public newUser = async (username: string, password: string, email: string, cpf: string) : Promise<Users> => {

        const repository = getRepository(Users)
        let query: Users;
        password = BcryptHandler.hashPassword(password);

        try {
            query = await repository.save({username, password, email, cpf});
        } catch (err) {
            return err;
        }

        return query;

    };

};

export default new UsersService();