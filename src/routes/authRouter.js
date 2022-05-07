import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';

import { validateSignUp, validateSignIn, verifyUser, validateUser } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSignUp, verifyUser, signUp);
authRouter.post("/sign-in", validateSignIn, validateUser, signIn);

export default authRouter;