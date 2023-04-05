import React from 'react';
import './App.css';
import NFTOwnershipCheck from './NFTOwnershipCheck';
import myImage from '/home/davesoma/dsassistant_v1/frontend/src/Dave86CH_epic_badass_marcus_aurelius_fighting_0c2c720e-bcff-471e-9a05-89aecb45722a.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={myImage} className="App-logo" alt="my-image" />
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <NFTOwnershipCheck />
        </div>
      </header>
    </div>
  );
}

export default App;
