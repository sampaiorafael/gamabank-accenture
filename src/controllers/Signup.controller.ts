import { RequestHandler, Request, Response, NextFunction } from 'express';

import SignupService from '../services/Signup.service';
import validateCPF from '../helpers/validateCpf';
import validatePassword from '../helpers/validatePassword'

class SignupController {
    
    public signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

        let { username, password, email, name, cpf, adress, phone } = req.body;

        if (!username || !password || !email || !name || !cpf || !adress || !phone)
            return res.status(400).json({status: 'Estão faltando campos'});

        const validePassword = validatePassword(password);

        if (validePassword.status === false)
            return res.status(400).json({status: `Senha inválida: ${validePassword.msg}`});

        if (!validateCPF(cpf))
            return res.status(400).json({status: 'CPF inválido'});

        let signupData;

        try {
            signupData = await SignupService.signup(username, password, email, name, cpf, adress, phone);
        } catch (err) {
            return res.status(400).json({status: err.message});
        };

        return res.status(201).json({status: signupData});

    };

};

export default new SignupController();