import { RequestHandler, Request, Response, NextFunction } from 'express';

import JWTHandler from '../helpers/JWTHandler';

class Auth {

    public checkBalance: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
       
        const token = req.headers.authorization

        if(!token)
            return res.status(400).send('Token de autenticação não encontrado');

        try {
            await JWTHandler.verifyToken((token))
        } catch (err) {
            return res.status(200).send('Token inválido ou expirado')
        }
        
        return res.status(200).send('The Balance')

    };

};

export default new Auth();