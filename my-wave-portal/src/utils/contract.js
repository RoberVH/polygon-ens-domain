
import { ethers } from "ethers"
import jsonContract from "./WavePortal.json"

//const contractAddress = '0xeE9fF56cC9F595e6052426617d793eF4Ae0E95c5'
//const contractAddress = '0x38C56a1136597157CDC3425AB53e1B9D9FF4411a'
//const contractAddress = '0x8F465862BB73105456d97d7510c2417c7F251127'
//const contractAddress = '0x1Bd871990B4cc3780B76A1C9261B724DA8db57D2'
const contractAddress = '0x7aBe8AA7c05610bC2004Fe56ADD4F7771E4Fc08D'
const contractABI = jsonContract.abi
let provider;
let signer;
let waveportalContract;

// This function must be called pior to use any other from this file
// It sets Provider to be used on all calls to contract

export const initializeProvider = async (ethereum, setPriceAmount)  => {
  if (ethereum){
      provider = new ethers.providers.Web3Provider(window.ethereum)
      signer = provider.getSigner()
      waveportalContract = new ethers.Contract(contractAddress, contractABI, signer)
      const price = await getPriceAmount()
      setPriceAmount(price)
}
    else
      console.log('No Metamask detected!')
}

/**
 * getWaves - Reads from contract  waves counter
 */
export const getWaves = async (setWaverCount) => {
  try {
  let count = await waveportalContract.getTotalWaves()
  console.log("Retrieved total wave count...", count.toNumber())
  setWaverCount(count.toNumber())
  } catch (error) {
        console.log('ERROR! ', error)
        alert('ERROR! ' +  error)
        }    
}

/**
 * Waves - Send to contract a wave
 */
export const wave = async (msg, setWinner) => {
  try {
  const waveTxn = await waveportalContract.wave(msg, { gasLimit: 300000 })
  console.log("Mining...",  waveTxn.hash)
  await waveTxn.wait()
  console.log("Mined --", waveTxn.hash)
  //  listener webhook to catch emited weHaveWinner events from contract
  waveportalContract.on("weHaveWinner", (prizeAmount, winner) => {
    console.log('weHaveWinner', prizeAmount, winner)
    setWinner(true)           // turn on the winnerWindowBox to let user know has won
      })  
  } catch (error)  {
      console.log('ERROR! ', 'reason: ',error.reason, ' - code: ' , error.code)
      alert(`Error reason: ${error.reason}. You must wait 1 minutes between calls!`)
        }    
} 

/**
 * getAddressWaves - Get number of waves ethAddress has waved 
 */
export const getAddressWaves = async (ethAddress) => {
  try {
  let count = await waveportalContract.howMuchThiswave(ethAddress)
  console.log(`Address: ${ethAddress} has waved ${count} times`)
  return count
  } catch (error) {
        console.log('ERROR! ', JSON.stringify(error))
        alert('ERROR! ' +  JSON.stringify(error))
        }    
} 

/**
 *  getAllWaves - Get array of all the wave structs in contract
 *                and  set them up with setArray passed function
 */

  export  const getAllWaves = async (setArrayWave)  => {
    try {
    let waves = await waveportalContract.getAllWaves()
    //console.log('Array of waves: ', waves)
    setArrayWave(waves)
    return 
    } catch (error)  {
        console.log('ERROR! ', JSON.stringify(error))
        alert('ERROR! ' +  JSON.stringify(error))
        }     
  }

  /**
 * setPriceAmount - Set the prize to be awarded. Contract will check only 
 *                  owner can set it
 *                  prize must be ethers in a string (example: "0.0002")
 */
export const setPrizeAmount = async (price) => {
  try {
  const waveTxn = await waveportalContract.setPrizeAmount(ethers.utils.parseEther(price), { gasLimit: 300000 })
  console.log("Mining...",  waveTxn.hash)
  await waveTxn.wait()
  console.log("Mined --", waveTxn.hash)
  } catch (error)  {
        console.log('ERROR! ', 'reason: ',error.reason, ' - code: ' , error.code)
        alert(`Error reason: ${error.reason}. You are not owner of contract!`)
        }    
} 

  /**
 * getPriceAmount - Get current  prize to be awarded
 */
export const getPriceAmount = async () => {
  let price=0;
  try {
    if (waveportalContract)  price = await waveportalContract.getPrizeAmount()
    // console.log("prize --", price)
    // console.log("ethers.utils.formatEther(price)", ethers.utils.formatEther(price))
    return ethers.utils.formatEther(price)
    } catch (error)  {
              console.log('ERROR! ', JSON.stringify(error))
              alert('ERROR! ' +  JSON.stringify(error))
          }    
  } 