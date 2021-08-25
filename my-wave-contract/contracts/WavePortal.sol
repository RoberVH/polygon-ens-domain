// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

/**    
*   WavePortal Contract
*           This contract was build during Buildspace course 'Build a Web3 App with Solidity + Ethereum Smart Contracts'
*           (https://buildspace.so/)
*           August 2021
*           It stores and retrieves waved + string messages coming from metamask wallets through web portal WavedPortal
*           also designed at the course
*           My WavePortal rendition is on replit.io ( https://waveportal-baseline-student.robervh.repl.co/ )
*           It's been modified by Roberto Vicuña        
*/ 

contract WavePortal {
    uint256 totalWaves;     // Record overal waves been received
    uint private seed;      // seed used to calculate ramdon number, it'll make for a hacker harder to
                            // figure out next random as it sets an unknown parameter for next calculation

    struct Wave {           // Records msg sent along the wave
        address waver;      // address of user who waved
        string message;     // Msg sent
        uint timestamp;     // timestamp when the user waved
    }
    Wave[] waves;           // array of struct Wave, to hold all waves & messages sent

    mapping(address => uint256) public waivers; // Record accounts's addresses waved at contract
    mapping(address => uint) public lastWavedAt;// Records time of waving to span same address calls, to avoid leeching 😀
    uint prizeAmount = 0.0001 ether;            // Allows to set prize to be awarded;
    address owner;
    

    // events - a cheaper way to store for later retrieval at client code this contract data
    //          it's not possible presently access this info from contract itself 🙁
    //event NewWave(address indexed from, uint timestamp, string message);    // Record msg  time waved at us
    event newPrizeSet(uint indexed newPrize);                               // Record change of prize
    event weHaveWinner(uint indexed prizeAmount, address winner);           // let UI know we send ether to user account



    constructor() payable {
        owner = msg.sender;
        console.log("Contract Deployed and Owner set to %s", owner);
    }

// setPrizeAmount   - only owner will be able to set prize
    function setPrizeAmount(uint _newPrize) public {
        require(msg.sender == owner, "Only owner can set prize!");
        prizeAmount = _newPrize;
        emit newPrizeSet(_newPrize);
    }

// getPrizeAmount   - reveals how much can win
    function getPrizeAmount() public view returns (uint ) {
        return prizeAmount;
        }
    
// wave - record a wave + msg received. Emit event NewWave recording 
//                  - address of caller
//                  - a string holding the message
//                  - current timestamp 
    function wave(string calldata _message) public {
        console.log('time stamp is: ', block.timestamp);
        require(lastWavedAt[msg.sender] + 60 seconds < block.timestamp, "Wait 1 minutes at least!");
        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        console.log("%s waved w/ message %s!", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));    // store the struct Wave record
        waivers[msg.sender] += 1;                                   // store how many times this account address has waved
        //emit NewWave(msg.sender, block.timestamp, _message);        // emit the Newwave event, easier to retrieve alter
                                                                    // at DApp client layer and cheaper for storing at Eth node
        //uint prizeAmount = 0.0001 ether;
        uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %s", randomNumber);
        seed = randomNumber;
        if (randomNumber > 35) {    // 65% chance to get reward
            console.log("%s won!", msg.sender);
            require(prizeAmount <= address(this).balance,'Trying to withdraw more money than the contract has.');
            (bool success,) = (msg.sender).call{value:prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
            emit weHaveWinner(prizeAmount, msg.sender);
        }
    }

//  getAllWaves   - Retrieve the array of Wave structs
    function getAllWaves() view public returns (Wave[] memory) {
        return waves;
    }


//  getTotalWaves   - Retrieve overal counter of waves
    function getTotalWaves() view public  returns (uint256) {
        return totalWaves;
    }

//  howMuchThiswave   - Retrieve  counter of waves a specific account address waiver has sent
    function howMuchThiswave(address _waiver) public view returns (uint256) {
        console.log(
            "This address %s has waived %d times",
            _waiver,
            waivers[_waiver]
        );
        return waivers[_waiver];
    }

} 
