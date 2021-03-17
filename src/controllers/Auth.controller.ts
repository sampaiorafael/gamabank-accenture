import { RequestHandler, Request, Response, NextFunction } from 'express';

import UsersService from '../services/Users.service'
import AccountsService from '../services/Accounts.service';
import JWTHandler from '../helpers/JWTHandler';
import BcryptHandler from '../helpers/BcryptHandler';

class AuthController {

    public login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
       
        let { reqUsername, reqPassword } = req.body;

        if (!reqUsername || !reqPassword)
            return res.status(400).send('Os campos necessários não estão preenchidos');

        let user = await UsersService.findByUsername(reqUsername);

        if (!user)
            return res.status(400).send('Usuário não encontrado');
        
        let { password } = user;

        if (!BcryptHandler.checkPassword(reqPassword, password))
            return res.status(400).send('Senha inválida');

        let account = await AccountsService.findAccountByUserId(user.id);

        if (!account)
            return res.status(400).send('Este usuário não possui conta ou está encerrada');

        let newToken = JWTHandler.newToken(account.accountNumber);
    
        return res.status(200).json({token: newToken});

    };

};

export default new AuthController();