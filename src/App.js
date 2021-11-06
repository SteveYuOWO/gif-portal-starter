import { useState, useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { checkIfWalletIsConnected, connectWallet } from './util';
import { TEST_GIFS } from './consts';

// Constants
const TWITTER_HANDLE = 'OwOsteveyu';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  useEffect(() => {
    window.addEventListener('load', async (event) => {
      const isConnected = await checkIfWalletIsConnected();
      if (isConnected) await connectWallet(setWalletAddress);
    });
  }, [])

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">💩 Buy more my NFTs</p>
          <p className="sub-header">Try to change something, I have tech in web2 and want to join solana network for development</p>
          <p className="sub-text">
            Address: {walletAddress ?? 'Not Connected'}
          </p>
          {
            !walletAddress ? <button
              className="cta-button connect-wallet-button"
              onClick={() => connectWallet(setWalletAddress)}
            >
              Connect to Wallet
            </button> :
              <div className="connected-container">
                {/* Go ahead and add this input and button to start */}
                <input type="text"
                  placeholder="Enter gif link!"
                  value={inputValue}
                  onChange={onInputChange} />
                <button className="cta-button submit-gif-button" onClick={sendGif}>Submit</button>
                <div className="gif-grid">
                  {gifList.map(gif => (
                    <div className="gif-item" key={gif}>
                      <img src={gif} alt={gif} />
                    </div>
                  ))}
                </div>
              </div>
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
