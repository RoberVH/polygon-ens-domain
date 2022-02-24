# Basic Ethereum Domain Name Server contract Hardhat Project

It aims to implement a contract to admininister a domain name registry
Contract has 2 fields: domain - the domain name,  amnd register, the pointer to a web site / IP address, IPFS / Airwave address
It grants rights to change the register only to domain owner

 This project is my rendition of Buildspace mini hackathon project.  it' was deployed to Polygon Testnet Mumbai and there is a companion web dapp to access it

## Accesing Dapp (in react) to this contract can be found here: 

https://github.com/RoberVH/polyogn-ens-Web-Dapp

### To test it:

$> npx hardhat scripts/run.js
$> npx hardhat scripts/run2.js
$> npx hardhat scripts/run3.js

### to deploy it to mumbai testnet:

$> npx hardhat run scripts/deploy.js --network mumbai

### Template Buildspace Project can be found here:
https://zip.sc/RUtP2


### Roberto V.
### Feb 2022
