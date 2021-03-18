import Express from './server/Express';
import configs from './config/configs';

const port = Number(configs.Server.port) || 80; 

Express.express.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${configs.Server.port}`);
});