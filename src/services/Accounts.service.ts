import { getRepository } from 'typeorm';

import { Accounts } from '../models/Account/Accounts.model';
import configs from '../config/configs';

class AccountsService {

    public newAccount = async (idUser: number): Promise<Accounts> => {

        const repository = getRepository(Accounts);

        let newAccount: Accounts
        const bankCode = configs.GamaBank.id;
        const agency = configs.GamaBank.agency;
        const accountNumber = await this.generateAccNumber();

        try {
            newAccount = await repository.save({idUser, bankCode, agency, accountNumber});
        } catch (err) {
            throw err
        };

        return newAccount;

    };

    public findAccountByNumber = async (accNumber: number): Promise<Accounts> => {

        const repository = getRepository(Accounts);
        let account: Accounts | undefined;

        try {
            account = await repository.findOne({ accountNumber: accNumber });
        } catch (err) {
            throw err
        }

        if (!account)
            throw new Error('Conta não encontrada');

        return account;

    }

    public findAccountByUserId = async (findUserId: number): Promise<Accounts> => {

        const repository = getRepository(Accounts);
        let account: Accounts | undefined;

        try {
            account = await repository.findOne({ idUser: findUserId });
        } catch (err) {
            throw err
        }

        if (!account)
            throw new Error('Conta não encontrada');

        return account;
    }

    private async generateAccNumber (): Promise<number> {
        const repository = getRepository(Accounts);
        let query = await repository.findOne({ order: { accountNumber: 'DESC' }});
        return query?.id ? query.id + 1 : 1;
    };

};

export default new AccountsService();