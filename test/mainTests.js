// import { getLastBlockTimestamp } from './utils.mjs'; // ES6 imports seem still not to be a thing in nodejs
//const utils = require('./utils');

const dmdcuApi = require('./dmdcuApi.js');
const DMDCertifiedUnique = artifacts.require('DMDCertifiedUnique');
const BN = web3.utils.BN;


contract('DMDCertifiedUnique', (accounts) => {
  console.log(`Accounts: ${accounts}`);

  // initial setup
  const noone = accounts[0]; //noone account should never be used. it's the default account used by web3.
  
  const blockservOrganisation = accounts[1];
  const certifier1 = accounts[2];
  const certifier2 = accounts[3];
  const endConsumer1 = accounts[4];
  const endConsumer2 = accounts[5];
  const endConsumer3 = accounts[6];

  let uniquesContract;
  let api;

  it('contract deployment', async()=> {

    //uniquesContract DMDCertifiedUnique
    uniquesContract = await DMDCertifiedUnique.new({from: blockservOrganisation});
    //uniquesContract = (await deployContract("DumbContract")) as DumbContract;
    //console.log('contract address:' + uniquesContract.address);
    //console.log(typeof DMDCertifiedUnique.abi);
    api = new dmdcuApi.DmdcuApi(web3, DMDCertifiedUnique.abi, uniquesContract.address);

  })


  it('certifier1 tries to add certifier2 but fails', async()=> {
    try {
      await api.addNewCertifier(certifier1, 'certifier2', '002',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
  })

  
  it('blockservOrganisation adds certifier1', async()=> {
    //console.log(typeof DMDCertifiedUnique.abi);
    //console.log();
    const result = await api.addNewCertifier(blockservOrganisation, 'certifier1', '001',certifier1, 'www.nomansland.example', 'a test certifier!', '');
    //console.log('certifier added:');
    //console.log(result);
  })

  it('certifier1 tries to add certifier2 but still fails', async()=> {
    try {
      await api.addNewCertifier(certifier1, 'certifier2', '002',certifier2, 'www.nomansland.example', 'a second test certifier!', '');
    } catch (error) {
      return;
    }

    throw new Error('addNewCertifier should fail, but it did not.');
  })

  it('certifier1 tries to add a new certifacte type but fails', async() => {
    try {
      await api.addNewAssetType(certifier1, 'motorcycle');
    } catch (error) {
      return;
    }
    throw new Error('addNewCertifier should fail, but it did not.');
  })

  it('blockservs adds motorcycle asset type', async() => {

    await api.addNewAssetType(blockservOrganisation, 'motorcycle');

    const allAssetTypes = await api.getAllAssetTypes();
    if (allAssetTypes[0] != 'motorcycle') {
      console.error(allAssetTypes);
      throw Error('addNewAssetType failed!');
    }
  })


  async function addNewMoto(certifier, targetAddress) {
    
    const result = await api.addNewMotorcycle(certifier, targetAddress, 'motorcycle', 'myName1', 'myName2', 'myName3',
      'this is worlds first blockchain certified motorcycle', '',
      Date.now(), 100, 611, 213, 0, 1);
    
    //console.log('addNewMotoResult: ', result);
    //console.log('motorcycleValues:' + motorcycleValues);
    //return await api.addNewAsset(certifier, targetAddress, assetType, 'myName1', 'myName2', 'myName3',
    //'plaintext', '', '', Date.now(), motorcycleValues);
  }


  it('blockservOrganisation tries to create an motorcycle certificate for endConsumer1, but fails', async()=> {

    try{
      await addNewMoto(blockservOrganisation, endConsumer1);
    } catch(error) {
      return false;
    }
    throw new Error('addNewCertifier should fail, but it did not.');

  })

  it('certifier1 creates an motorcycle certificate for endConsumer1', async()=> {
    await addNewMoto(certifier1, endConsumer1);
  })


  it('endConsumer1 accepts that certificate', async()=> {

  })

  it('blockservOrganisation adds certifier2', async()=> {

  })

  //V2 requirements
  // as a certifier
  // - i can change my data
  //
  // as a owner
  // - i can change the address of a certifier (use case: certifier lost his keys)
  

});