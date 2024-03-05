import React, {useState} from 'react';
import './Home.css';
import Stake from '../AllTabs/Stake/Stake';
import UnStake from '../AllTabs/UnStake/UnStake';


const Home = ({tabs}) => {

    const [activeTab, setActiveTab] = useState("Stake");
 
    //Functions to handle tab switching
    const handleTab1 = () =>{
        setActiveTab("Stake");
    }

    const handleTab2 = () =>{
        setActiveTab("UnStake");
    }

  return (
        <div className="home-logo">
          <div className="outlet">
            <div className="outlet-stake">
               <ul className={activeTab === "Stake"? "active":""} onClick={handleTab1}>Stake</ul>
            </div>
            <div className="outlet-unstake">
               <ul className={activeTab === "UnStake"? "active":""} onClick={handleTab2}>UnStake</ul>
            </div>
          </div>
          <div className="home-stake">{activeTab==="Stake"? <Stake/>:<UnStake/>}</div>
            <div className="locked-stake">
                <p>Locked Staking</p>
                <div className="locked-stake-box">
                    <div>Locked 30 days</div>
                    <p>8% API</p>
                    <ul>Enter Amount</ul>
                </div>
                <div className="locked-stake-box">
                    <div>Locked 60 days</div>
                    <p>9% API</p>
                    <ul>Enter Amount</ul>
                </div>
                <div className="locked-stake-box">
                    <div>Locked 90 days</div>
                    <p>12% API</p>
                    <ul>Enter Amount</ul>
                </div>
            </div>
      </div>
  )
}

export default Home