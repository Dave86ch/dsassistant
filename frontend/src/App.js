import React, { useState, useEffect } from 'react';
import './App.css';
import NFTOwnershipCheck from './NFTOwnershipCheck';
import myImage from '/home/davesoma/dsassistant_v1/frontend/src/Dave86CH_epic_badass_marcus_aurelius_fighting_0c2c720e-bcff-471e-9a05-89aecb45722a.png';
import model1Image from '/home/davesoma/dsassistant_v1/frontend/src/data_model_pic/davesoma.jpg';
import model2Image from '/home/davesoma/dsassistant_v1/frontend/src/data_model_pic/Optimalist_Lee_Kuan_Yew.png';
import model3Image from '/home/davesoma/dsassistant_v1/frontend/src/data_model_pic/Optimalist_Marcus_Aurelius.png';
import axios from 'axios';


function App() {
  const [selectedModel, setSelectedModel] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const getImageForModel = (model) => {
    // Return the image source based on the selected model
    switch (model) {
      case '1_davesoma.json':
        return model1Image;
      case '3_lee_kuan_yew.json':
        return model2Image;
      case '2_marcus_aurelius.json':
        return model3Image;
      // Add more cases for each model
      default:
        return myImage;
    }
  };

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get('http://localhost:5000/data_model');
        const fetchedModels = response.data.models;

        if (fetchedModels.length > 0) {
          // Set the first model as the default selected model
          setSelectedModel(fetchedModels[0]);
          setImageSrc(getImageForModel(fetchedModels[0]));
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    }

    fetchModels();
  }, []);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    // Update the image source based on the selected model
    const newImageSrc = getImageForModel(model);
    setImageSrc(newImageSrc);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageSrc} className="App-logo" alt="my-image" />
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <NFTOwnershipCheck onModelChange={handleModelChange} />
        </div>
      </header>
    </div>
  );
}

export default App;
