import Express from './server/Express';
import configs from './config/configs';

Express.express.listen(configs.Server.port, () => {
    console.log(`Servidor rodando na porta ${configs.Server.port}`);
});