import db from "../db.js";
import recordSchema from "../schemas/recordSchema.js";
import { ObjectId } from "mongodb";


export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send("No token."); // unauthorized

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.status(401).send("No session."); // unauthorized

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) return res.sendStatus(404); // not found

    res.locals.user = user;

    next();
  } catch (error) {
    console.log("token", error);
    res.status(500).send("Error checking token.");
  }
}
export async function validateRecord(req, res, next) {
  const record = req.body;
  try {
    await recordSchema.validateAsync(record);
    next();
  } catch (error) {
    console.log("record", error);
    res.status(400).send("Invalid record.");
  }
}

export async function validateId(req, res, next) {
  const id = req.params.id;
  if (!id) return res.status(400).send("No id.");

  try {
    const record = await db.collection("history").findOne({ _id: ObjectId(id) });
    if (!record) return res.sendStatus(404);
    
    res.locals.record = record;
    next();
  } catch (error) {
    console.log("id", error);
    res.status(500).send("Error checking id.");
  }
}
