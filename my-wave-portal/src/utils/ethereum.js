/*******************************************************************
* checkMMaskExist - Check if Metamask is present on browser 
*              returns object with properties:
*            codeReturn:  false/true
*            ethereum: Metamask's ethereum object if exists / null
*****************************************************************/

export const checkMMaskExist = () => {
  const { ethereum } = window
  if (!ethereum) {
    console.log("Make sure you have metamask!")
    return {returnCode:false, ethereum:null} 
    }
    else {
     // console.log("We have ethereum object!")
      return {returnCode:true, ethereum: ethereum}
    }
  }

/*******************************************************************
* connectMetamaskAccount - Request connection to  MM accounts 
* user authorize and connects accounts: set address variable state
*  denies access: print error to console and do nothing
*****************************************************************/
export const connectMetamaskAccount = (ethereum, setAddress) => {
  if (!ethereum) {
    alert("This DApp requires Metamask but found none, please install it")
    setAddress('')
    return
  }
 ethereum.request({method: 'eth_requestAccounts'})
  .then(accounts => {
   console.log("connected", accounts[0])
   setAddress(accounts[0])
   return 
 }).catch (error =>  {
      console.log("Can't establish connection to Metamask Accounts, error:", error)
      })
}

 /*******************************************************************
 *  checkMMAccounts - check if we already  have  permissions to Metamask account
 *****************************************************************/
 export const checkMMAccounts = (ethereum, setAddress) => {
   if (ethereum) {
      ethereum.request({method: 'eth_accounts'})
      .then ( accounts => {
          if (accounts.length !==0) {
            setAddress(accounts[0])
          } else {
            console.log('No accounts connected')
            }

      }).catch (error =>  {
        console.log("Can't request accounts status to Metamask , error:", error)
      })
   }
  }
