import { Router } from "express";
import { registerUser,loginUser,registerFoodPartner ,logoutUser, loginFoodPartner,logoutFoodPartner } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/user/register', registerUser);
authRouter.post('/user/login', loginUser);
authRouter.post('/user/logout', logoutUser);


authRouter.post('/foodpartner/register', registerFoodPartner);
authRouter.post('/foodpartner/login', loginFoodPartner);
authRouter.post('/foodpartner/logout', logoutFoodPartner);

export default authRouter;