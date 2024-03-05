import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-tokens">
        <p>Total Staked Tokens</p>
        <p>$8,345,560</p>
        </div>
        <div className="footer-tokens">
        <p>Total Renewal Amount</p>
        <p>$1,345,560</p>
        </div>
        <div className="footer-tokens">
        <p>Stakers</p>
        <p>$76,560</p>
        </div>
    </div>
  )
}

export default Footer