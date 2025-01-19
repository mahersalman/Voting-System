import {ethers} from "ethers";
import {createBallotAPI,ballotAPI} from "./contractApi";
import * as dotenv from "dotenv";
import { get } from "http";
dotenv.config();


// _______________________________ CreateBallot Contract _______________________________
export async function createNewBallot(
  isConnected: boolean,
  walletClient: any,
  title: string,
  description: string,
  startDate: number,
  endDate: number,
  candidateList: string[],
  voters: string[]
) {
  if (!isConnected) {
    throw new Error("Please connect your wallet");
  }
  if (!walletClient) {
    throw new Error("Wallet client is not available");
  }
  try {
    const provider = new ethers.BrowserProvider(walletClient);
    const signer = await provider.getSigner();
    const contractAddress = process.env.NEXT_PUBLIC_CREATE_BALLOT_CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error("NEXT_PUBLIC_CREATE_BALLOT_CONTRACT_ADDRESS is not defined in the environment variables");
    }
    const contract = new ethers.Contract(contractAddress, createBallotAPI, signer);
 
    // Interact with the contract
    const tx = await contract.createBallot(title, description, startDate, endDate, candidateList, voters);
    await tx.wait();

    console.log("Ballot Created Successfully");
  } catch (error) {
    console.error("Error creating ballot:", error);
    throw error;
  }
}


export async function getBallotsAddresses(){
    // Set up provider and signer
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const contracrtAddress = process.env.NEXT_PUBLIC_CREATE_BALLOT_CONTRACT_ADDRESS;
    if (!contracrtAddress) {
        throw new Error("CREATE_BALLOT_CONTRACT_ADDRESS is not defined in the environment variables");
    }
    const contract = new ethers.Contract(contracrtAddress, createBallotAPI, provider);

    const ballots = await contract.getBallots();
    return ballots;

}

// _______________________________ Ballot Contract _______________________________

export async function getBallotDetails(ballotContractAddresses: string[]) {
  // Set up provider and signer
  let ballots = [];
  try {
      const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
      const currentTime = Math.floor(Date.now() / 1000); // Current time 

      for (let i = 0; i < ballotContractAddresses.length; i++) {
          const contract = new ethers.Contract(ballotContractAddresses[i], ballotAPI, provider);
          const title = await contract.title();
          const description = await contract.description();
          const startDate = await contract.start_date();
          const endDate = await contract.end_date();
          const results = await contract.getResults();

          let status = "";
          if (endDate < currentTime) {
              status = "Finished";
          } else if (startDate > currentTime) {
              status = "Coming";
          } else if (startDate <= currentTime && endDate >= currentTime) {
              status = "Active";
          }

          ballots.push({
              "_id": ballotContractAddresses[i],
              "title": title,
              "description": description,
              "startDate": startDate,
              "endDate": endDate,
              "results": results,
              "status": status
          });
      }

  } catch (error) {
      console.error("Error getting network:", error);
  }
  return ballots;
}


export async function ballot_voting(walletClient: any , contractAddress: string, candidate:string){
  try {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ballotAPI, signer);
      const tx = await contract.vote(candidate);
      await tx.wait();
      console.log("Voted Successfully");
  } catch (error) {
      console.error("Error voting:", error);
      throw error;
  }
}