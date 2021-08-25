/**
 *      run.js
 *              script to test WavePortal contract
 */

const { ethers } = require("hardhat");

async function main () {
    const [owner, randoPerson] = await ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({value: ethers.utils.parseEther("0.01")});
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
    

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave('Mexico City!');
    let txReceipt = await waveTxn.wait();
    for (const event of txReceipt.events) {
        //console.log('Evento-> ', event)
        if (event.event == 'NewWave') console.log('Evento NewWave emitido:', event)
        if (event.event == 'weHaveWinner') console.log('Evento weHaveWinner emitido:', event)

    }

    contractBalance = await ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

    // waveTxn = await waveContract.wave('Winterfell, Westeros');
    // await waveTxn.wait();

    // waveCount = await waveContract.getTotalWaves();

    // waveTxn = await waveContract.connect(randoPerson).wave(`The Capitol, Panem ${randoPerson.address}`);
    // await waveTxn.wait();

    let prizeAmount = await waveContract.getPrizeAmount();
    console.log('Prize set to', ethers.utils.formatEther(prizeAmount))
    

    waveTxn = await waveContract.setPrizeAmount(ethers.utils.parseEther("0.0002"));       // this must pass!
    txReceipt = await waveTxn.wait();
    for (const event of txReceipt.events) {
        //console.log('Evento-> ', event)
        if (event.event == 'newPrizeSet') console.log('Evento newPrizeSet emitido:', event)
    }      

    prizeAmount = await waveContract.getPrizeAmount();
    console.log('Prize set to', ethers.utils.formatEther(prizeAmount))

    contractBalance = await ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
    
    waveTxn = await waveContract.connect(randoPerson).wave(`Arnor, Middle-earth ${randoPerson.address}`);
    txReceipt = await waveTxn.wait();
    for (const event of txReceipt.events) {
        //console.log('Evento-> ', event)
        if (event.event == 'weHaveWinner') console.log('Evento weHaveWinner emitido:', event)
      }

    contractBalance = await ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));        // to check in case we give away 0.002 ethers

    waveCount = await waveContract.getTotalWaves();
    console.log('Total # of waves:',waveCount.toNumber())

    contractBalance = await ethers.provider.getBalance(waveContract.address)
    console.log("Contract balance:", ethers.utils.formatEther(contractBalance));

   
    let counter = await waveContract.howMuchThiswave(randoPerson.address)
    console.log(`Total number of ${randoPerson.address} waves is`, counter.toNumber())

    // leecher sending wave before 15 minutes, must fail!
    waveTxn = await waveContract.connect(randoPerson).wave(`Trantor, Trantor ${randoPerson.address}`);
    txReceipt = await waveTxn.wait();    

    // console.log('----------------------------- All Waves  -----------------------------')
    // let allWaves = await waveContract.getAllWaves()
    // console.log(allWaves)

    waveTxn = await waveContract.connect(randoPerson).setPrizeAmount(ethers.utils.parseEther("0.0002"));      // this must fail!
    txReceipt = await waveTxn.wait();
    for (const event of txReceipt.events) {
        //console.log('Evento-> ', event)
        if (event.event == 'newPrizeSet') console.log('Evento newPrizeSet emitido:', event)
      }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
