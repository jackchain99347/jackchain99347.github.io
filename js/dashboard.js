App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    web3 = new Web3(App.web3Provider);

    $.getJSON('NFTCollection.json', function(data) {
      var NFTCollectionArtifact = data;
      App.contracts.NFTCollection = TruffleContract(NFTCollectionArtifact);
      App.contracts.NFTCollection.setProvider(App.web3Provider);

      return App.getUserNFT();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-connect', App.handConnect);
  },

  getUserNFT: async function() 
  {
    
    try {
      const accounts = await ethereum.request({method: 'eth_accounts'});
      let account = accounts[0];

      const instance = await App.contracts.NFTCollection.deployed();
      let nft_inst = instance;

      const nft_c = await nft_inst.tokensOfOwner(account);
      let nfts = nft_c;

      var token_id;
      var id_uri;

      for (j=1;j<nfts.length;j++)
      {
        const id_uri = await nft_inst.tokenURI(nfts[j]);
        var t_id_uri = id_uri;

        $.getJSON(j+'.json', function(data) {
          var petsRow = $('#petsRow');
          var petTemplate = $('#petTemplate');
          for (i=0;i<data.length;i++) 
          {
            petTemplate.find('.nft-name').text(data[i].name);
            petTemplate.find('img').attr('src', data[i].id_uri);
            petTemplate.find('.nft-id').text(data[i].id);
            petTemplate.find('.nft-desc').text(data[i].description);
            petTemplate.find('.nft-value').text(data[i].value);
  
            petsRow.append(petTemplate.html());
          }//end of for
        });//end of $.getJSON
      }//end of for
    } catch (err) {
      console.log(err);
    };
  },

  handConnect: async function(event) {

    try {
      event.preventDefault();

      const accounts = await ethereum.request({method: 'eth_accounts'});
      let account = accounts[0];
      console.log("account = "+account);

    } catch (err) {
      console.log(err);
    }
  },
};

$(function() {
    App.init();
});
