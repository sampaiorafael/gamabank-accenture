import { RequestHandler, Request, Response, NextFunction } from 'express';

class StatusController {

    public status: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return res.status(200).send(`Servidor On Line: ${ new Date()}`);
    }

}

export default new StatusController();
