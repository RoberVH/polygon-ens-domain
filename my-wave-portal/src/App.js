import * as React from "react"
import { nanoid } from "nanoid"
import { 
  checkMMaskExist, 
  connectMetamaskAccount, 
  checkMMAccounts
  } from "./utils/ethereum"
import { 
  initializeProvider, 
  getWaves,
  wave,
  getAddressWaves,
  getAllWaves,
  setPrizeAmount,
  }   from './utils/contract'
  import { formatDate } from './utils/misc'
import DisplayWinner from './components/DisplayWinner'
import circulararrows from  "./imgs/circular-arrows.gif"
import './App.css';

  

export default function App() {

// state vars 
// to store our approved eth account address
  const [currAccount, setCurrentAccount] = React.useState('')
// to store overall count of waves  
  const [waverCount, setWaverCount] = React.useState(0)
// to switch mining time graphic display
  const [miningTime, setMingingTime] = React.useState(false)
// to store list of waves been issued
  const [allWaves, setAllWaves] = React.useState([])
// to hold msg textbox
  const [msg2Send, setMsg2Send]  = React.useState('')
// to store price Amount
  const [priceAmount,setPriceAmount] = React.useState(0.0001)
// to display winner window box
  const [winner, setWinner] = React.useState(false)


  const {returnCode, ethereum} = checkMMaskExist()
  if (returnCode) {
    checkMMAccounts(ethereum, setCurrentAccount)
    
  } else {
    console.log('No Metamask')
  }


  const handleWave = async  () => {
    setMsg2Send('')
    setMingingTime(true)
    await getWaves(setWaverCount)
    await wave(msg2Send, setWinner)
    await getWaves(setWaverCount)
    await getAllWaves(setAllWaves)
    setMingingTime(false)
  }
  
  const handleConnectMMEth = async () => {
    connectMetamaskAccount(window.ethereum, setCurrentAccount)
  }

  const handleAddressWaves = async () => {
    const timesWaved = await getAddressWaves(currAccount)
    alert(`This account ( ${currAccount} ) has waved ${timesWaved} times at me, Thank you!`)
  }

  const handleSetPrice = async () => {
    console.log('price amount',  priceAmount )
    await setPrizeAmount(priceAmount.toString())
  }

React.useEffect ( () => {
    if (currAccount) {
        initializeProvider(ethereum,setPriceAmount)
        getWaves(setWaverCount)
        getAllWaves(setAllWaves)
    }
  },
  [currAccount, ethereum])

   return (
  <div>
    <div className = "header"> Roberto's WavePortal Dapp</div>
    <div className="mainContainer">
      { winner &&
        <div className = "winnerBoxClass">
          <DisplayWinner address={currAccount} setWinnerFlag={setWinner} amount={priceAmount}/>
        </div>
        }
      <div className="dataContainer">
          <p>
            This DApp is built for
            <a href='https://buildspace.so' rel="noopener noreferrer" target="_blank"> Buildspace Ethereum Course. </a>
            &nbsp;&nbsp;<strong>Metamask</strong> is needed, (please <a href='https://metamask.io/download' rel="noopener noreferrer" target="_blank"> install it</a>  if you don't have it)
          </p>            
        <div>
          {!currAccount &&
              <button 
                className="buttonClass" 
                onClick = { handleConnectMMEth }
              >
                <span style={{display:'flex', flexDirection: 'row'}}>
                <img 
                  alt='Connection' 
                  src="https://img.icons8.com/pastel-glyph/64/fa314a/wall-socket-with-plug--v1.png"
                  width='45'
                  heigth='45'
                  />
                  <span style={{marginTop:'0.9rem'}} >
                  Click here to Connect Metamask Wallet !
                  </span>
                </span>
              </button>        
            }
            {currAccount &&
              <div>
              <div 
              style = {{marginTop: '1rem', 
                        display:'flex', 
                        flexDirection:'row'}}>
                    { miningTime &&
                      <img 
                      className = "spinIconClass"
                      src = {circulararrows} alt='MINING ETHEREUM' width="30" height="30"
                      />
                    }                  
                  <button className="buttonClass" onClick = { handleWave }>
                    {
                      miningTime ? 'Mining, please wait...': '👋 Wave at Me '
                    }
                  </button>                          
                  <input 
                    value={msg2Send}
                    placeholder = '(...and tell me here what city you are at )'
                    className = "inputCity"
                    type='text' 
                    onChange = {((e) => setMsg2Send(e.target.value))}
                  />

                </div>
                <div>
                  <button className="buttonClass" onClick = { handleAddressWaves }>
                    <img alt='' src="https://img.icons8.com/color/30/000000/123.png" />
                    {'  '}Click here to know how many times you have waved
                  </button>
                </div>
                <div>
                  <button className="buttonClass" onClick = {handleSetPrice}>
                    <img 
                      alt='Money' src='https://img.icons8.com/plasticine/100/000000/money.png'
                      heigth='40' width= '40'
                      />
                    {'  '} Set Prize (only owner)
                  </button>
                  <input 
                    className="inputPrize" 
                    type="number" 
                    value= {priceAmount} 
                    onChange={(e) => setPriceAmount(e.target.value)} 
                  />
                </div>
               </div>
            }

          </div>
      </div>
    {   allWaves.length > 0 &&
     <div className = "tableContainer">
          <p> <strong>Who have waved:</strong></p>
        <table>
        <tbody>
          <tr key = {nanoid()}>
            <th> Account</th>
            <th> Time</th>
            <th> From</th>
          </tr>
          { 
            allWaves.map(wave =>  { 
              return (
            <tr key = {nanoid()} >
              <td>{wave.waver} </td>
              <td>{formatDate(new Date(wave.timestamp*1000))} </td>
              <td>{wave.message} </td>
            </tr>)
            })
          }
          </tbody>
        </table>
      </div>}
      <div className = "noticeClass">
      <a 
        rel="noopener noreferrer" 
        target="_blank"
        href="https://icons8.com/icon/55206/numbers">Numbers, socket with plug & circle icons by Icons8
      </a>
      </div>
      <div className = "statusBarClass">
          <span>
          {(returnCode) ?
          '\u2705 MetaMask detected ' : 
          '\u26D4 No MetaMask detected  (please install it) '} 
          </span>
          <span >
            &nbsp;&nbsp;&nbsp; || &nbsp;&nbsp;&nbsp;
              {currAccount && currAccount.length !== 0 ? 'Current Account: ' + currAccount : '\u2757 No account connected'}
              <label style={{float:'right', paddingRight:'4rem'}}><strong>Total Wave Count: &nbsp;{waverCount}</strong></label>
          </span>
      </div>
    </div>

  </div>
  );
}
