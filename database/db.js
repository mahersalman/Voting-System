const { MongoClient } = require("mongodb");
const { ObjectId } = require('mongodb');

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Cluster94244:S0pYbFJHWXhM@cluster94244.a0lfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster94244";
const client = new MongoClient(uri);

async function connectToDatabase(){
  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db('votes-db');
  }
  catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

async function getVoteList(db) {
  try{
    const collection = db.collection('vote');
    const voteList = await collection.find().toArray(); 
    const statusOrder = ['Ongoing','Upcoming','Completed'];
    voteList.sort((a,b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    return voteList;
  }catch(error){
    console.error("Error retrieving the vote list: ", error);
    throw error;
  }

}
  
async function getVoteData(db, id) {
  try {
    const collection = db.collection('vote'); // Replace 'vote' with your collection name
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

async function insertVoteData(db, voteData) {
  try {
    const collection = db.collection('vote'); 
    const result = await collection.insertOne(voteData);
    console.log(`${result.insertedCount} documents were inserted.`);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

async function main() {
  /*get list 
  try {
    const db = await connectToDatabase(); // Await the database connection
    const votes = await getVoteList(db); // Await the vote collection
    console.log(votes); // Output the votes
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close(); // Ensure the client is closed properly
  }
    */

  /* get one data
   
  try {
    const db = await connectToDatabase(); // Await the database connection
    const vote = await getVoteData(db, '6766e628f3e04028dce6f3e1'); // Await the vote collection
    console.log(vote); // Output the votes
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close(); // Ensure the client is closed properly
  }
    */

  /*insert data 
  try {
    const db = await connectToDatabase(); // Await the database connection
    const voteData = {
      title: "Election 2021",
      status: "Ongoing",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-12-31"),
      description : "This is the election for the year 2021",
      candidates: [
        { name: "Candidate 1", votes: 0 },
        { name: "Candidate 2", votes: 0 },
        { name: "Candidate 3", votes: 0 },
        { name: "Candidate 3", votes: 0 }
    ]} 
    }catch (error) {
      console.error("Error:", error);
    } finally {
      await client.close(); 
    }
    await insertVoteData(db, voteData); 
  */

/* create full list  
    const db = await connectToDatabase(); 
    createListOfVotes(db);
*/
    }

async function createListOfVotes(db) {
  try {
    const collection = db.collection('vote');

    // Data to insert
    const electionsData = [
      {
        Title: "Presidential Election 2024",
        Status: "Ongoing",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        Description: "This election determines the President for the next term. Your vote matters",
        candidates: [
          { name: "Alice Johnson", votes: 1200 },
          { name: "Bob Smith", votes: 980 },
          { name: "Catherine Davis", votes: 870 },
          { name: "Daniel Brown", votes: 1100 }
        ]
      },
      {
        Title: "City Council Vote",
        Status: "Upcoming",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        Description: "City Council Vote",
        candidates: [
          { name: "Evelyn Turner", votes: 0 },
          { name: "Frank Martin", votes: 0 },
          { name: "Grace Lee", votes: 0 },
          { name: "Henry Wilson", votes: 0 }
        ]
      },
      {
        Title: "School Board Election",
        Status: "Completed",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        Description: "School Board Election",
        candidates: [
          { name: "Isabella Moore", votes: 320 },
          { name: "James Taylor", votes: 410 },
          { name: "Katherine Anderson", votes: 290 },
          { name: "Liam Thomas", votes: 500 }
        ]
      }
    ];

    const result = await collection.insertMany(electionsData);
    console.log(`${result.insertedCount} documents were inserted.`);
    
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

module.exports = {
  connectToDatabase,
  getVoteList,
  getVoteData,
  insertVoteData
};

