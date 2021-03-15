import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../swagger.json';


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
        this.express.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDoc) )
   }

   private async database(){
        return await createConnection();
   }

}

export default new Express();