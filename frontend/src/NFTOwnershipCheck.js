import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import axios from 'axios';
import MyNFT from './MyNFT.json';
import './NFTOwnershipCheck.css';
import DisconnectButton from './DisconnectButton.js';



// Update these hardcoded values as needed
const CONTRACT_ADDRESS = '0x2af5686c7fb1cf54978b0bcdaab4285a189e7995';
const TOKEN_ID = 8;
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

;

const NFTOwnershipCheck = () => {
  const [connected, setConnected] = useState(false);
  const [owner, setOwner] = useState(false);
  const [account, setAccount] = useState(null);
  const [question, setQuestion] = useState('');
  const [responseTree, setResponseTree] = useState('');
  const [ownershipMessage, setOwnershipMessage] = useState('');
  const [initialMessage, setInitialMessage] = useState('Ask your question');
  const disconnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
    }
    setConnected(false);
    setAccount(null);
    setOwner(false);
  };
  
  

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (!provider) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setConnected(true);
      setAccount(accounts[0]);
      checkNFTOwnership(accounts[0]);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const checkNFTOwnership = async (userAddress) => {
    const web3 = new Web3(Web3.givenProvider);
    const nftContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
    const currentOwner = await nftContract.methods.ownerOf(TOKEN_ID).call();
    if (currentOwner.toLowerCase() === userAddress.toLowerCase()) {
      setOwner(true);
      setOwnershipMessage("Congratulations on your ownership of a unique dscompounding NFT! Enjoy the wisdom and leadership of Marcus Aurelius, one of history's greatest philosophers and emperors"); // Add this line
    } else {
      setOwner(false);
    }
  };


  // ...

  // ...

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected || !owner) {
      alert('Please connect your wallet and verify NFT ownership.');
      return;
    }
  
    setLoading(true); // Set loading to true before making the request
    setResponseTree(null);
    try {
      const response = await axios.post('http://localhost:5000/ask', { question });
      setResponseTree(response.data.response_tree); // Update this line
      setQuestion(''); // Add this line
      setInitialMessage('Ask your next question'); // Add this line
    
    } catch (error) {
      console.error('Error while submitting question:', error);
    }
  
    setLoading(false); // Set loading back to false after the request is completed
  };
  

  

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet}>Connect to Web3 Wallet</button>
      ) : (
        <>
          <DisconnectButton onDisconnect={disconnectWallet} />
          {owner ? (
            <div>
              <p>Account: {account}</p>
              <p className= 'ownership-message'>{ownershipMessage}</p> {/* Update this line */}              <form onSubmit={handleSubmit}>
              <form onSubmit={handleSubmit}></form>
                <input
                  className='input-box'
                  type="text"
                  placeholder="Ask your question"
                  value={question}
                  onFocus={() => setInitialMessage('')}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
              {responseTree && (
                <div>
                  <h3>Answer:</h3>
                  <p className="answer">{JSON.stringify(responseTree)}</p> {/* Update this line */}
                </div>
              )}
              {/* Add this block for the loading message */}
              {loading && (
                <p className="loading-text">Marcus is meditating upon your question...</p>
              )}
            </div>
          ) : (
            <p>You do not own the required NFT to access this feature.</p>
          )}
        </>
      )}
    </div>
  );
  };
  
  export default NFTOwnershipCheck;
  
