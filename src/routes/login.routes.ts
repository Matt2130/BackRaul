import { Router, Request, Response } from "express";
import { loginAlumnos, createUser, getAllUsers, getUserByMatricula, deleteUser } from '../controller/login.controller';

const router = Router();

router.post('/login/alumnos', (req: Request, res: Response) => {
    loginAlumnos(req, res)
});

router.post('/createUser', (req: Request, res: Response) => {
    createUser(req, res);
});

router.get('/getUser', (req: Request, res: Response) => {
    getAllUsers(req, res);
});

router.get('/getByMatricula/:matricula', (req: Request, res: Response) => {
    getUserByMatricula(req, res);
});

router.patch('/deleteUser/:matricula', (req: Request, res: Response) => {
    deleteUser(req, res);
});

export default router;