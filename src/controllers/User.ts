class UserController {

    public test = (req: any, res: any, next: any) => {
        res.status(200).send('Olá mundojoooooooooooooooooo');
    }

}

export default new UserController();
