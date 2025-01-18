import {ethers} from "hardhat";

async function deployContract(contractName : string){
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    
    await contract.waitForDeployment();
    console.log(`${contractName} deployed to:`, await contract.getAddress());
}


deployContract("CreateBallot").catch((error) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
});

