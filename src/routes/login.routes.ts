import { Router, Request, Response } from "express";
import { loginAlumnos, createUser, getAllUsers, getUserByMatricula, deleteUser } from '../controller/login.controller';
import { loginWithGoogle } from "../controller/loginWithGoogle.controller";
import { chatSend, getMisMensajes } from "../controller/chat.controller";

const router = Router();

router.post('/login', (req: Request, res: Response) => {
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

router.post('/login-google', (req: Request, res: Response) => {
    loginWithGoogle(req, res);
});


//Chat routes
router.post('/chatmsj', (req: Request, res: Response) => {
    chatSend(req, res);
})

router.get("/chat/misMensajes", (req: Request, res: Response) => {
    getMisMensajes(req, res);
});


export default router;