export const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log('Phantom wallet found!');


        /*
         * The solana object gives us a function that will allow us to connect
         * directly with the user's wallet!
         */
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        return true
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

/*
* Let's define this method so our code doesn't break.
* We will write the logic for this next!
*/
export const connectWallet = async (setWalletAddress) => {
  const { solana } = window;

  if (solana) {
    const response = await solana.connect();
    console.log('Connected with Public Key:', response.publicKey.toString());
    setWalletAddress(response.publicKey.toString());
  }
};