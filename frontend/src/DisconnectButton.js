import React from 'react';

const DisconnectButton = ({ disconnectWallet }) => {
  return (
    <button onClick={disconnectWallet}>
      Disconnect
    </button>
  );
};

export default DisconnectButton;
