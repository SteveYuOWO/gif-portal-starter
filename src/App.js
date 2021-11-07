import { useState, useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { checkIfWalletIsConnected, connectWallet, createGifAccount, getGifList } from './util';
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

      try {
        getGifList(setGifList)
      } catch (error) {

      }
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

  const renderConnectedContainer = () => {
    // If we hit this, it means the program account hasn't be initialized.
    if (gifList === null) {
      return (
        <div className="connected-container">
          <button className="cta-button submit-gif-button" onClick={() => createGifAccount(setGifList)}>
            Do One-Time Initialization For GIF Program Account
          </button>
        </div>
      )
    }
    // Otherwise, we're good! Account exists. User can submit GIFs.
    else {
      return (
        <div className="connected-container">
          <input
            type="text"
            placeholder="Enter gif link!"
            value={inputValue}
            onChange={onInputChange}
          />
          <button className="cta-button submit-gif-button" onClick={sendGif}>
            Submit
          </button>
          <div className="gif-grid">
            {/* We use index as the key instead, also, the src is now item.gifLink */}
            {gifList.map((item, index) => (
              <div className="gif-item" key={index}>
                <img src={item.gifLink} />
              </div>
            ))}
          </div>
        </div>
      )
    }
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
              renderConnectedContainer()
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
