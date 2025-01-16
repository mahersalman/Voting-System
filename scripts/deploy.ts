import {ethers} from "hardhat";

async function deployContract(contractName : string){
    const Contract = await ethers.getContractFactory("contractName");
    const contract = await Contract.deploy();
    
    await contract.waitForDeployment();
    console.log(`${contractName} deployed to:`, contract.address);
}

/*
deployContract("name").catch((error) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  });
  */