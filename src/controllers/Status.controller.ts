class StatusController {

    public status = (req: any, res: any, next: any) => {
        res.status(200).send(`Servidor On Line: ${ new Date()}`);
    }

}

export default new StatusController();
