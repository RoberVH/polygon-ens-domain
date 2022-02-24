const main = async () => {
  const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("plus");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  console.log("Owner of contract address is :", owner.address);
  console.log("Random Person 1 address is :", randomPerson1.address);
  console.log("Random Person 2 address is :", randomPerson2.address);
  
  console.log("\n------------------- Setting domains -----------------------------------");
  let txn = await domainContract.register("wordle", {value: hre.ethers.utils.parseEther('0.1')});
  const txReceipt = await txn.wait();
  console.log('***************************************************TXN:\n');
  for (const event of txReceipt.events) {
    if (event.event === 'DomainMinted') console.log('Evento DomainMinted emitido:', event)
     
}
    console.log('***************************************************');

  txn = await domainContract.connect(randomPerson1).register("twitter",{value: hre.ethers.utils.parseEther('0.1')}); 
  await txn.wait();

  txn = await domainContract.connect(randomPerson2).register("gmail",{value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  console.log("\n------------------- Getting domains owners -----------------------------------");

  let domainOwner = await domainContract.getAddress("wordle");
  console.log("Owner of domain wordle:", domainOwner);

  domainOwner = await domainContract.getAddress("twitter");
  console.log("Owner of domain twitter:", domainOwner);

  domainOwner = await domainContract.getAddress("gmail");
  console.log("Owner of domain gmail:", domainOwner);

  console.log("\n------------------- Setting records -----------------------------------");
  
  txn = await domainContract.connect(owner).setRecord("wordle", "//wordle");
  await txn.wait();  

  txn = await domainContract.connect(randomPerson1).setRecord("twitter", "//twitter");
  await txn.wait();  
  
  txn = await domainContract.connect(randomPerson2).setRecord("gmail", "//gmail");
  await txn.wait();  

  console.log("\n------------------- Getting records -----------------------------------");
  txn = await domainContract.connect(owner).getRecord("wordle");
  console.log("record of wordle is:", txn);

  txn = await domainContract.connect(owner).getRecord("twitter");
  console.log("record of twitter is:", txn);

  txn = await domainContract.connect(owner).getRecord("gmail");
  console.log("record of gmail is:", txn);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  console.log("\nNext, trying to set a record from a non owner address domain (it should give an error):\n");

  // Trying to set a record that doesn't belong to me!
    txn = await domainContract.connect(randomPerson).setRecord("doom", "Haha my domain now!");
    await txn.wait();




}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();