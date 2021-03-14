import { RequestHandler, Request, Response, NextFunction } from 'express';

import SignupService from '../services/Signup.service';
import ValidateCPF from '../helpers/validateCpf';
import ValidaSenha from '../helpers/validasenha'

class SignupController {
    
    public signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        let { username, password, email, name, cpf, adress, phone } = req.body;

        if (!username || !password || !email || !name || !cpf || !adress || !phone)
            return res.status(400).send('Estão faltando campos');

        const validatePassword = ValidaSenha(password)

        if (validatePassword.status === false)
            return res.status(400).send(`Senha inválida: ${validatePassword.msg}`)

        if (!ValidateCPF(cpf))
            return res.status(400).send('CPF inválido');

        let data;

        try {
           data = await SignupService.signup(username, password, email, name, cpf, adress, phone);
        } catch (err) {
            return res.status(400).send(err.message)
        }

        return res.status(201).send(data);

    };

}

export default new SignupController();