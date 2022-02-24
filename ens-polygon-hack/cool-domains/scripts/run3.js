const main = async () => {
    const [owner, superCoder] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("plus");
    await domainContract.deployed();
  
    console.log("Contract owner:", owner.address);
  
    // Let's be extra generous with our payment (we're paying more than required)
    console.log("Registering domain too short... domain: MY");
    try {
      let txn = await domainContract.register("MY",  {value: hre.ethers.utils.parseEther('0.5')});
      await txn.wait();
    } catch(error){ 
      console.log(String(error).slice(0,100),'\n'); }

    console.log("Registering domain too long (more than 12 chars)... domain: erre-con-erre-cigarro");
    try {
      txn = await domainContract.register("erre-con-erre-cigarro",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    } catch(error){console.log(String(error).slice(0,150),'\n'); }
  
    try {
      console.log("Registering domain with not enough money... domain: MIO with pay: 0.1");
      txn = await domainContract.register("MIO",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    } catch(error){ console.log(String(error).slice(0,150),'\n'); }

    try {
      console.log("Registering several correct domains: 'MIO', 'valkirias', 'alebrijes'");
      txn = await domainContract.register("MIO",  {value: hre.ethers.utils.parseEther('0.5')});
      await txn.wait();
      txn = await domainContract.register("valkirias",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
      txn = await domainContract.register("alebrijes",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    } catch(error){ console.log(console.log(String(error).slice(0,50),'\n')); }

    console.log("Reading all domains");
    txn = await domainContract.getAllNames();
    console.log("\nReceived from contract next domain list: ");
    for (let i=0; i< txn.length; i++) {
      console.log("Domain with token %d: %s", i, txn[i]);
    }

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