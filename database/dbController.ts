import { ObjectId } from "mongodb";
import { connectToDatabase } from "./dbConnection";

export async function getVoteList(): Promise<any[]> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("vote");
    const voteList = await collection.find().toArray();
    const statusOrder = ["Ongoing", "Upcoming", "Completed"];
    voteList.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    return voteList;
  } catch (error) {
    console.error("Error retrieving the vote list: ", error);
    throw error;
  }
}

export async function getVoteData(id: string): Promise<any | null> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("vote");
    const vote = await collection.findOne({ _id: new ObjectId(id) });

    if (!vote) {
      console.log("No vote found with the given ID.");
      return null;
    }
    return vote;
  } catch (error) {
    console.error("Error retrieving the vote:", error);
    throw error;
  }
}

export async function insertVoteData(voteData: any): Promise<void> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("vote");
    const result = await collection.insertOne(voteData);
    console.log(`${result} vote(s) were inserted.`);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

export async function createListOfVotes(): Promise<void> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("vote");
    const electionsData = [
      {
        title: "Presidential Election 2024",
        status: "Ongoing",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        description: "This election determines the President for the next term. Your vote matters.",
        candidates: [
          { name: "Alice Johnson", votes: 1200 },
          { name: "Bob Smith", votes: 980 },
        ],
      },
    ];

    const result = await collection.insertMany(electionsData);
    console.log(`${result.insertedCount} documents were inserted.`);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}