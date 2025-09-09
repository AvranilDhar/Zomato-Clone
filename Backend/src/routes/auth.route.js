import { Router } from "express";
import { registerUser,loginUser,registerFoodPartner , loginFoodPartner } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/user/register', registerUser);
authRouter.post('/user/login', loginUser);
authRouter.post('/user/foodPartnerRegister', registerFoodPartner);
authRouter.post('/user/foodPartnerLogin', loginFoodPartner);

export default authRouter;