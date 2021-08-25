import React from 'react'
import banana from '../imgs/banana.gif'
import banana2 from '../imgs/banana2.gif'
import banana3 from '../imgs/banana007.gif'
import banana4 from '../imgs/banana_smiley_6.gif'

import './DisplayWinner.css'

//const amount = async() => await getPriceAmount()

const DisplayWinner = ({address, setWinnerFlag, amount}) => {


    return (
    <div className = "windowWinner">
        <p>
            {'⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐  ⭐ ⭐  ⭐ ⭐⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐  ⭐ ⭐  ⭐ ⭐'}
        </p>
        <p>
            CONGRATULATIONS!!!!
        </p>
        <button className= "buttonClass closeWindowButtonClass" onClick = {() => setWinnerFlag(false)}>
         <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>  
        </button>
        <p>
  
  
            <img alt='' src = {banana3} />
            <img alt='' src = {banana} /> 
            <img alt='' src = {banana2} />
            <img alt='' src = {banana4} />
            YOU WON!!!!!
            <img alt='' src = {banana4} />
            <img alt='' src = {banana} /> 
            <img alt='' src = {banana2} />
            <img alt='' src = {banana3} />
   
        </p>
        <p>
            {`This account ( ${address} ) has been sent ${amount} ethers`}
        </p>
        <br></br>
            {'⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐'}
    </div>
    )}

export default DisplayWinner;