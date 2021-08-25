

async function main () {
    const [deployer] = await ethers.getSigners();
    console.log("Deployer Account address:", deployer.address);
    console.log("Deployer Account balance:", (await deployer.getBalance()).toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
