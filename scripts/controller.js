const hre = require("hardhat");
const LogHashFactoryJson = require("../artifacts/contracts/LogHashFactory.sol/LogHashFactory.json");
const LogHashJson = require("../artifacts/contracts/LogHash.sol/LogHash.json");
const DriverIndexMappingJson = require("../artifacts/contracts/DriverIndexMapping.sol/DriverIndexMapping.json");
const LogHashFactoryABI = LogHashFactoryJson.abi;
const LogHashABI = LogHashJson.abi;
const DriverMappingABI = DriverIndexMappingJson.abi;
require('dotenv').config();

const alchemy = new hre.ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.ALCHEMY_API_KEY
);

const createLog = async (
    privateKey,
    srcHash,
    resultHash,
    srcLink,
    dataLink
)  => {
    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const LogHashFactory = new hre.ethers.Contract(
        process.env.FACTORY_ADDRESS,
        LogHashFactoryABI,
        userWallet
    )

    const tx = await LogHashFactory.createDeviceLog(
        srcHash,
        resultHash,
        srcLink,
        dataLink
    );

    await tx.wait();

    return await LogHashFactory.getLastChildAddress();
}

const getLog = async (privateKey, address) => {
    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const LogHash = new hre.ethers.Contract(
        address,
        LogHashABI,
        userWallet
    );

    const data = await LogHash.getLog();

    console.log("data: " + data);

    return data;
};

const getAllLogHashes = async (privateKey) => {
    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const LogHashFactory = new hre.ethers.Contract(
        process.env.FACTORY_ADDRESS,
        LogHashFactoryABI,
        userWallet
    );

    const data = await LogHashFactory.getDeployedChildContracts();

    console.log("data: " + data);

    return data;
}

const setDriverMetrics = async (
    privateKey,
    address,
    seatbeltEngaged,
    breakingIntensity,
    averageSpeed,
    nonIndicatedTurns,
    mileage,
    averageFuelConsumption,
) => {
    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const LogHash = new hre.ethers.Contract(
        address,
        LogHashABI,
        userWallet
    );

    const tx = await LogHash.setDriverIndex(
        seatbeltEngaged,
        breakingIntensity,
        averageSpeed,
        nonIndicatedTurns,
        mileage,
        averageFuelConsumption,
    );

    await tx.wait();

    return await LogHash.getDriverIndexAddress();
}

const getDriverMetrics = async (privateKey, address) => {
    const userWallet = new hre.ethers.Wallet(privateKey, alchemy);

    const DriverMapping = new hre.ethers.Contract(
        address,
        DriverMappingABI,
        userWallet
    );

    const data = await DriverMapping.getDriverIndex();

    console.log("data: " + data);

    return data;
};

module.exports = {
    createLog,
    getLog,
    getAllLogHashes,
    setDriverMetrics,
    getDriverMetrics
};

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
// });