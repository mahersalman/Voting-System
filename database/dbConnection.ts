import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://Cluster94244:S0pYbFJHWXhM@cluster94244.a0lfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster94244";
const client = new MongoClient(uri);

let dbInstance: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log("Connected to the database");
      dbInstance = client.db("votes-db");
    } catch (error) {
      console.error("Error connecting to the database: ", error);
      throw new Error("Database connection failed");
    }
  }
  return dbInstance;
}

export async function disconnectDatabase(): Promise<void> {
  if (client) {
    await client.close();
    console.log("Disconnected from the database");
  }
}

