import db from "../db.js";

import { signUpSchema, signInSchema } from "../controllers/authController.js";

export async function validateSignUp(req, res, next) {
  const user = req.body;
  try {
    await signUpSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error.details);
  }
}

export async function validateSignIn(req, res, next) {
  const user = req.body;
  try {
    await signInSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error.details);
  }
}

export async function validateUser(req, res, next) {
  const user = req.body;
  try {
    const userFromDb = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!userFromDb) {
      return res.status(401).send("Invalid email or password");
    }
    const isValid = await bcrypt.compare(user.password, userFromDb.password);
    if (!isValid) {
      return res.status(401).send("Invalid email or password");
    }
    res.locals.user = userFromDb;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
