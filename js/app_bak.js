

// Basic Actions Section
const onboardButton = document.getElementById('connectButton');
const getAccountsButton = document.getElementById('getAccounts');
const getAccountsResults = document.getElementById('getAccountsResult');
const mintNFTButton = document.getElementById('mintNFT');


const initialize = async () => {

  console.log("[initialize] Enter!!");

  let accounts;
  let onboarding;

  const isMetaMaskConnected = () => accounts && accounts.length > 0;

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  function handleNewAccounts (newAccounts) {
    accounts = newAccounts;
    updateButtons()
  }

  const onClickInstall = () => {
    console.log("[onClickInstall] Enter!!");
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    onboarding.startOnboarding();
  };

  const onClickConnect = async () => {
    console.log("[onClickConnect] Enter!!");
    try {
      const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      handleNewAccounts(newAccounts);
    } catch (error) {
      console.error(error);
    }
  };

  getAccountsButton.onclick = async () => {
    console.log("[getAccountsButton] Enter!!");
    try {
      const _accounts = await ethereum.request({
        method: 'eth_accounts',
      });
      getAccountsResults.innerHTML = _accounts[0] || 'Not able to get accounts';
    } catch (err) {
      console.error(err);
      getAccountsResults.innerHTML = `Error: ${err.message}`;
    }
  };

  mintNFTButton.onclick = async () => {

    console.log("[mintNFTButton] Enter!!");

    try {
     
    } catch (err) {
      console.error(err);
    }
  };

  const updateButtons = () => {

    console.log("[updateButtons] Enter!!");

 
    if (!isMetaMaskInstalled()) {
      onboardButton.innerText = 'Click here to install MetaMask!';
      onboardButton.onclick = onClickInstall;
      onboardButton.disabled = false;
    } else if (isMetaMaskConnected()) {
      onboardButton.innerText = 'Connected';
      onboardButton.disabled = true;
      if (onboarding) {
        onboarding.stopOnboarding();
      }
      mintNFTButton.disabled = false;
    } else {
      onboardButton.innerText = 'Connect';
      onboardButton.onclick = onClickConnect;
      onboardButton.disabled = false;
    }
  }

  updateButtons();
  
};

$(function() {
  console.log("[Debug] Enter!!");
  initialize();
});
