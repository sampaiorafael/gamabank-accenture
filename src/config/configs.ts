import 'dotenv/config';

export default {
    Server: {
        port: process.env.SERVER_PORT
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expireTime: 999999999
    }
};