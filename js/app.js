App = {
  web3Provider: null,
  contracts: {},
  nftcollectionArtifact: {},
  accounts: {},

  init: async function() {

    var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    App.web3Provider = web3.currentProvider;

    $.getJSON('NFTCollection.json', function(data){
      App.nftcollectionArtifact = data;
      App.contracts.NFTCollection = TruffleContract(App.nftcollectionArtifact);
      App.contracts.NFTCollection.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-connect', App.handConnect);
  },

  /*handConnect: function() {
       // Load pets.
       $.getJSON('../pets.json', function(data) {
        var petsRow = $('#petsRow');
        var petTemplate = $('#petTemplate');
  
        for (i = 0; i < data.length; i ++) {
          petTemplate.find('.panel-title').text(data[i].name);
          petTemplate.find('img').attr('src', data[i].picture);
          petTemplate.find('.pet-breed').text(data[i].breed);
          petTemplate.find('.pet-age').text(data[i].age);
          petTemplate.find('.pet-location').text(data[i].location);
          petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
  
          petsRow.append(petTemplate.html());
        }
  },*/

  handConnect: async function(event) {

    try {
      event.preventDefault();

      const accounts = await ethereum.request({method: 'eth_accounts'});
      let account = accounts[0];
      console.log("account = "+account);

    } catch (err) {
      console.log(err);
    }
  }

};

$(function() {
    App.init();
});
