import jwt from 'jsonwebtoken';

import configs from '../config/configs';

class JWTHandler {

    public newToken(accountNumber: number): string {
        return jwt.sign({ id: accountNumber }, JSON.stringify(configs.JWT.secret), {
            expiresIn: configs.JWT.expireTime
        });
    };

    public async verifyToken (token: string): Promise<object | any> {
        return new Promise ( (resolve,reject)=>{
            jwt.verify(token, JSON.stringify(configs.JWT.secret), (err, decoded) => {

                if (err)
                    throw err
                
                resolve(decoded)
            });

        }) 
    }

};

export default new JWTHandler();