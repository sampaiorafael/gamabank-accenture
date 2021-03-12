import express from 'express';

import routes from '../routes/routes';

class Express {

    public server: any

    constructor() {
        this.server = express();
        this.routes();
    }

   private routes() {
       this.server.use(routes);
   } 

}

export default new Express();