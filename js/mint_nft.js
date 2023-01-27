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
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-mint-nft', App.handMintNFT);
  },

  handMintNFT:async function(event) {
    try {
      //console.log("[debug] call handMintNFT: function() ");
      event.preventDefault();

      const accounts = await ethereum.request({method: 'eth_accounts'});
      let account = accounts[0];
      console.log("account = "+account);

      const instance = await App.contracts.NFTCollection.deployed();
      var nft_inst = instance;
      //console.log("nft_inst = ",nft_inst);

      let name = document.getElementById('nft_name').value;
      //console.log("name = "+name);
      let desc = document.getElementById('nft_desc').value;
      //console.log("desc = "+desc);
      let img_file_1 = document.getElementById('1_nft_image_File').value;
      //console.log("img_file_1 = "+img_file_1);
      let p_img_file_1 = img_file_1.replace('C:\\fakepath\\','');
      //console.log("p_img_file_1 = "+p_img_file_1);
      let img_file_2 = document.getElementById('2_nft_image_File').value;
      let p_img_file_2 = img_file_2.replace('C:\\fakepath\\','');
      //console.log("p_img_file_2 = "+p_img_file_2);
      let img_file_3 = document.getElementById('3_nft_image_File').value;
      let p_img_file_3 = img_file_3.replace('C:\\fakepath\\','');
      //console.log("p_img_file_3 = "+p_img_file_3);
      let img_file_4 = document.getElementById('4_nft_image_File').value;
      let p_img_file_4 = img_file_4.replace('C:\\fakepath\\','');
      //console.log("p_img_file_4 = "+p_img_file_4);

      await nft_inst.mintMemNFTs(p_img_file_1,p_img_file_2,p_img_file_3,p_img_file_4,1,{from:account,gas:1000000,gasLimit:210000});
        // Execute adopt as a transaction by sending account
        //return adoptionInstance.adopt(petId, {from: account});
      } catch (err) {
        console.log(err);
      };
    
  }

};

$(function() {
    App.init();
});
