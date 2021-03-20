import 'dotenv/config';

export default {
    Server: {
        port: process.env.PORT,
        host: process.env.SERVER_HOST
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expireTime: 3600
    },
    Mailer: {
        host: process.env.MAIL_HOST,
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        port: process.env.MAIL_PORT
    },
    Bcrypt: {
        salt: process.env.BCRYPT_SALT
    },
    GamaBank: {
        id: 500,
        agency: 1
    },
    CreditCard:{
        initialLimit: 200
    }
};