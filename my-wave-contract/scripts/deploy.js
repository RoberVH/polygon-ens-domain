
// deploy to  hardhat local network (run with 'npx hardhat node') it gives us 20 accounts each bearing 1000 eth 
//10,000 trillion (spanish trillions)  gwei's ()
// run this file with 'npx hardhat run scripts/deploy.js --network localhost'
async function main () {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const waveContractFactory = await ethers.getContractFactory("WavePortal");
    //const waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther("0.000001")});
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed()

    console.log("WavePortal address:", waveContract.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
