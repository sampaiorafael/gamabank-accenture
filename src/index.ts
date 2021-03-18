import Express from './server/Express';
import configs from './config/configs';

const port = Number(configs.Server.port) || 3000; 

Express.express.listen(port, () => {
    console.log(`Servidor rodando na porta ${configs.Server.port}`);
});