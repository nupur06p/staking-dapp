import React from 'react';
import './UnStake.css';

const UnStake = () => {
  return (
    <div className="home-unstake-box">
      <div className="home-apy">7% APY</div>
        <div className="unstake">
        <p>UnStake</p>
        <div className="unstake-box">1</div>
        <div className="unstake-data">
            <ul>Balance:7.34</ul>
            <hr/>
            <ul>Exchange Rate:1.035678</ul>
            <hr/>
            <button>UNSTAKE</button>
        </div>
        </div>
    </div>
  )
}

export default UnStake

