import bcrypt from 'bcrypt';

import configs from '../config/configs';

class BcryptHandler {

    private secret: any = configs.Bcrypt.salt

    public hashPassword(password: string): any {
        return bcrypt.hashSync(password, this.secret);
    };

    public checkPassword(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(password, hashPassword);
    };

};

export default new BcryptHandler()