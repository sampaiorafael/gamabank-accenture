import jwt from 'jsonwebtoken';

import configs from '../config/configs';

class JWTHandler {

    public newToken(username: string): string {
        return jwt.sign({id: username}, JSON.stringify(configs.JWT.secret), {
            expiresIn: configs.JWT.expireTime
        });
    };

    public verifyToken (token: string) {
        return jwt.verify(token, JSON.stringify(configs.JWT.secret), (err, decoded) => {

            if (err)
                return false
            
            return true
        });
    }

};

export default new JWTHandler();