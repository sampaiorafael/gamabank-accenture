import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import swagguerUi from 'swagger-ui-express';
import swagguerDoc from '../config/swagger.json';

import routes from '../routes/routes';

class Express {

    public express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.database();
    }

    private middlewares() {
        this.express.use(bodyParser.urlencoded({extended: true}));
   }

   private routes() {
        this.express.use(routes);
        this.express.use('/swagger',swagguerUi.serve, swagguerUi.setup(swagguerDoc) )
   }

   private async database(){
        return await createConnection();
   }

}

export default new Express();