import express from 'express'
import Express from './server/Express';
import configs from './config/configs';

const app = express();
//Chamando o EJS como Template Engine
app.set('view engine', 'ejs')
//Isso autoriza a utilização de arquivos externos como css, imagens, etc.
app.use(express.static('public'));

Express.express.listen(configs.Server.port, () => {
    console.log(`Servidor rodando na porta ${configs.Server.port}`)
})
