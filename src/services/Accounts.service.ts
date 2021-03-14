import { getRepository } from 'typeorm';

import { Accounts } from '../models/Accounts.model';
import configs from '../config/configs';

class AccountsService {

    public newAccount = async (idUser: number): Promise<any> => {

        const repository = getRepository(Accounts);

        let query;
        const idBank = configs.GamaBank.id;
        const agency = configs.GamaBank.agency;
        const accountNumber = await this.generateAccNumber();

        try {
            query = await repository.save({idUser, idBank, agency, accountNumber});
        } catch (err) {
            throw err
        };

        return query;

    };

    private async generateAccNumber (): Promise<number> {
        const repository = getRepository(Accounts);
        let query = await repository.findOne({ order: { id: 'DESC' }});
        return query?.id ? query.id + 1 : 1;
    };

};

export default new AccountsService();