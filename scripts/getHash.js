const hre = require("hardhat");
require('../hardhat.config.js');
const ContractJson = require("../artifacts/contracts/LogHash.sol/LogHash.json");
const abi = ContractJson.abi;
require('dotenv').config();

async function main(address, privateKey) {
    const alchemy = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const LogHash = new hre.ethers.Contract(
        address,
        abi,
        userWallet
    )

    console.log('Getting hash from contract...');

    const hash = await LogHash.getHash();

    console.log("before: " + hash);

    return hash;
}

module.exports = main;

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
// });