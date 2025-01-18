import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();


const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    localganache:{
      url: "HTTP://127.0.0.1:7545",
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
    sepolia:{
      url: "https://sepolia.infura.io/v3/3f43eb3c25b14d1598597625e9499bce",
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  }
};

export default config;
