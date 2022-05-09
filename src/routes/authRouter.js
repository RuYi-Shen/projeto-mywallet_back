import { Router } from 'express';
import { signUp, signIn, logOut } from '../controllers/authController.js';

import { validateSignUp, validateSignIn, validateLogOut, verifyUser, validateUser, verifyInfo } from '../middlewares/authMiddleware.js';
import { validateToken } from '../middlewares/historyMiddleware.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSignUp, verifyUser, signUp);
authRouter.post("/sign-in", validateSignIn, validateUser, signIn);
authRouter.post("/log-out", validateLogOut, validateToken, verifyInfo, logOut);

export default authRouter;