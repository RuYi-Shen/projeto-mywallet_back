import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log("MongoDB database is running.")
} catch (error) {
  console.log("Error connecting to database", error);
}

export default db;