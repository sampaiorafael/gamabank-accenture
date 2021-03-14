import jwt from 'jsonwebtoken';

import configs from '../config/configs';

class JWTHandler {

    public newToken(username: string): string {
        return jwt.sign({id: username}, JSON.stringify(configs.JWT.secret), {
            expiresIn: configs.JWT.expireTime
        });
    };

    public async verifyToken (token: string): Promise<object | undefined> {
        return new Promise ( (resolve,reject)=>{
            jwt.verify(token, JSON.stringify(configs.JWT.secret), (err, decoded) => {

                console.log(decoded)

                if (err)
                    throw err
                
                resolve(decoded)
            });

        }) 
    }

};

export default new JWTHandler();