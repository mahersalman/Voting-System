import {ethers} from "ethers";
import {createBallotAPI,ballotAPI} from "./contractApi";
import * as dotenv from "dotenv";
import { get } from "http";
dotenv.config();


const privateKey = '0xbc98dbfe9f80aee35e9992067280650495c9e3ba032f304c03a718c727c750f2'

// _______________________________ CreateBallot Contract _______________________________

async function createBallot(title:string , description:string, startDate: number, endDate: number, candidateList: string[], voters: string[]){
    // Set up provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    const singer = new ethers.Wallet(privateKey, provider);

    const contracrtAddress = process.env.CREATE_BALLOT_CONTRACT_ADDRESS;
    if (!contracrtAddress) {
        throw new Error("CREATE_BALLOT_CONTRACT_ADDRESS is not defined in the environment variables");
    }
    const contract = new ethers.Contract(contracrtAddress, createBallotAPI, singer);

    const tx = await contract.createBallot(title, description, startDate, endDate, candidateList, voters);
    await tx.wait();
    console.log("Ballot Created Successfully");
}


async function getBallotsAddresses(){
    // Set up provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    const singer = new ethers.Wallet(privateKey, provider);

    const contracrtAddress = process.env.CREATE_BALLOT_CONTRACT_ADDRESS;
    if (!contracrtAddress) {
        throw new Error("CREATE_BALLOT_CONTRACT_ADDRESS is not defined in the environment variables");
    }
    const contract = new ethers.Contract(contracrtAddress, createBallotAPI, singer);

    const ballots = await contract.getBallots();
    console.log("ballots: ",ballots);

}



// createBallot("Ballot 1", "This is the first ballot", 1620000000, 1630000000, ["Candidate 1", "Candidate 2"], ["0xf7731312eC973D6896B827b91B558dC3ec65F5C9","0xCB33CDCE3c8855F8f6aa66a639d9067a38662AD1"]).catch((error) => {
//     console.error("Error creating ballot:", error);
//     process.exitCode = 1;
// });
// createBallot("Ballot 2", "This is the second ballot", 1630000000, 1640000000, ["Can 1", "Can 2"], ["0xf7731312eC973D6896B827b91B558dC3ec65F5C9","0xCB33CDCE3c8855F8f6aa66a639d9067a38662AD1"]).catch((error) => {
//     console.error("Error creating ballot:", error);
//     process.exitCode = 1;
// });

// getBallotsAddresses().catch((error) => {
//     console.error("Error getting ballots:", error);
//     process.exitCode = 1;
// });




// _______________________________ Ballot Contract _______________________________

const ballot_contract = "0x3d077E48159f8ca5BFF2C219279f73dFce8649cC";

export async function getBallotDetails(ballotContractAddress: string){
    // Set up provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    const singer = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(ballotContractAddress, ballotAPI, singer);

    const title = await contract.title();
    console.log("title: ",title);
    const description = await contract.description();
    console.log("description: ",description);
    const startDate = await contract.start_date();
    console.log("startDate: ",startDate);
    const endDate = await contract.end_date();
    console.log("endDate: ",endDate);
    const results = await contract.getResults();
    console.log("results: ",results);

    return [{"_id":ballotContractAddress, "title":title, "description":description, "startDate":startDate, "endDate":endDate, "results":results, "status":"Open"}];
}

getBallotDetails(ballot_contract).catch((error) => {
    console.error("Error getting ballot details:", error);
    process.exitCode = 1;
});