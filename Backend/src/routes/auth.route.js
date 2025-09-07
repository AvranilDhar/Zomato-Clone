import { Router } from "express";
import { registerUser,loginUser } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/user/register', registerUser);
authRouter.post('/user/login', loginUser);

export default authRouter;