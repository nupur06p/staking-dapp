import React, {useState, useEffect} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';

const Navbar = () => {
  const[walletAddress, setWalletAddress]= useState("");

  useEffect(()=>{
    getCurrentWalletConnected();
    addWalletListener();
  });

  const connectWallet = async() =>{
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try{
        /*MetaMask is installed*/
        const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      }catch (err){
        console.error(err.message);
      }
    }else{
      /*MetaMask is not installed*/
      console.log("Please install MetaMask");
    }
  }

  //To handle reloading of the page when we lose the reference to our account number in MetaMask
  const getCurrentWalletConnected = async() =>{
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try{
        const accounts = await window.ethereum.request({method:"eth_accounts"});
        if(accounts.length>0){
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else{
          console.log("Connect to MetaMask using the Connect button");
        }
        
      }catch (err){
        console.error(err.message);
      }
    }else{
      /*MetaMask is not installed*/
      console.log("Please install MetaMask");
    }
  }

  //Connecting to MetaMask if the account is changed
  const addWalletListener = async() =>{
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      window.ethereum.on("accounts Changed", (accounts)=>{
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
      }else{
      /*MetaMask is not installed*/
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  }


  return (
    <div className="navbar">
        <div className="nav-logo">
            <p>Staking Bear</p>
            <img src={logo} alt=""/>
        </div>  
        <div className="nav-button">
            <button onClick={connectWallet}>
              {walletAddress && walletAddress.length >0
            ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`
            : "Connect Wallet"}</button>
        </div>
    </div>
  )
}

export default Navbar