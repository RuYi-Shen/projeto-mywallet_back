import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    delete user.passwordConfirmation;
    await db.collection("users").insertOne(user);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function signIn(req, res) {
  const user = res.locals.user;

  try {
    const token = uuid();
    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });
    res.json({ token, username: user.name });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function logOut(req, res) {
  const token = req.body.token;
  
  try {
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
