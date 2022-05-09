import db from "../db.js";
import { ObjectId } from "mongodb";

export async function getHistory(req, res) {
  try {
    const history = await db.collection("history").find({}).toArray();
    res.send(history);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function addRecord(req, res) {
  const record = req.body;
  try {
    record.time = new Date();
    record.date =
      String(record.time.getDate()).padStart(2, "0") +
      "/" +
      String(record.time.getMonth() + 1).padStart(2, "0");
    await db.collection("history").insertOne(record);
    res.send(record);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function editRecord(req, res) {
  const record = req.body;
  const id = req.params.id;
  try {
    await db
      .collection("history")
      .updateOne({ _id: ObjectId(id) }, { $set: record });
    res.send(record);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function deleteRecord(req, res) {
  const id = req.params.id;
  try {
    await db.collection("history").deleteOne({ _id: ObjectId(id) });
    res.send("Record deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
