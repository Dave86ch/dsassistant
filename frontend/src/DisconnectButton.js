import React from 'react';

const DisconnectButton = ({ onDisconnect }) => {
  return (
    <button onClick={onDisconnect}>
      Disconnect
    </button>
  );
};

export default DisconnectButton;
