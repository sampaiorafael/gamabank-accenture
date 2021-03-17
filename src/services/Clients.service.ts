import { getRepository } from 'typeorm';

import { Clients } from '../models/Clients.model';

class ClientsService {

    public newClient = async (idUser: number, name: string, adress: string, phone: string): Promise<Clients> => {

        const repository = getRepository(Clients);

        let newClient: Clients;

        try {
            newClient = await repository.save({idUser, name, adress, phone});
        } catch (err) {
            throw err;
        };

        return newClient;

    };

};

export default new ClientsService();